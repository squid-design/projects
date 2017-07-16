---
layout: post
title:  "Setting up LDAP for use in Shiny"
tags: shiny ldap r
date:   2014-08-08 11:35:02
author:
  - Evan Farrell
description: How to set up a ldap server for use with Shiny server.
---

LDAP, or Lightweight Directory Access Protocol, has a long history of use.  LDAP is usually used in large enterprise corporations where they store employee data and use it for single sign-on (SSO) and more.  Single sign-on is where the company's LDAP directory integrates with other applications such as the company intranet using the protocol.

For companies using R as the programming language of choice, Shiny Server is incredibly useful as a server. Unfortunately, when authentication needs put in place, there are only a few options:

1. Flat file&mdash;good if you don't add new users often and you don't want to have to reset the password.
2. PAM&mdash;you need to know Linux well to set up, and it is restricting for a large user base like flat-file.
3. Google&mdash;good if you know all your clients have an account.
4. LDAP&mdash;until Shiny accepts using a database connection, LDAP seems like the best choice.

Getting a LDAP server running can be very tedious; in order to set up it up, you need to learn a lot about how the convoluted ldif files work with adding new entries.  And, most of the information on the web can be limited on what server package to actually use.  Here is how we set up our LDAP server to authenticate our clients.

<!--more-->

### First Steps ###

The first thing is getting a Linux server.  Amazon AWS makes it easy, and since we already use an EC2 server to host our Shiny Server, we just put it on a separate server that we host Docker containers on.  Our LDAP server is inside a Docker container, but to make it simple, you can install it directly on the server.  The next thing we choose is which LDAP server package to use.  There are a few open source options on the market including OpenLDAP, OpenDJ, and ApacheDS.  While perhaps the most configurable and well-used, we found openLDAP to be overall complex for the setup we need.  ApacheDS seemed overly-bloated when we looked at speed tests of the different choices. So we decided on using OpenDJ, with the small disadvantage of having to use Java.

OpenDJ makes it much easier to set up by using a commandline tool.  With that, ssh into your server command line and prepare to install OpenDJ. The first thing you need to do is get the system set up with Java by installing it.  I'm assuming here you are running Ubuntu; if you are using a different Linux distro, it shouldn't be too hard to use this guide. You also need to download a version of [opendj here][opendj_download]. If using Ubuntu, we recommend downloading the `.deb` file.  We will go over that as well as installing from the `.zip` file. Use `wget` then copy the link to the file download, just like we did below.
{% highlight bash %}
# install Java
sudo apt-get install default-jre

# download opendj
wget http://download.forgerock.org/downloads/opendj/20140727020001/opendj_2.7.0-120140727_all.deb
{% endhighlight %}

The next step is to install it.  Here are the two methods:

#### From .deb ####
run the following command
{% highlight bash %}
# we used the filename that we downloaded above, but use the one you downloaded.
sudo dpkg -i opendj_2.7.0-120140727_all.deb
{% endhighlight %}

This will install it into the `/opt/opendj` path. We will be referencing this a lot.

#### From .zip #####

For the zip, simply unzip it into the area where you want the install to be.  To be consistent, we would recommend unziping it to `/opt/opendj`.  The rest of the setup will assume that.
{% highlight bash %}
# use the name of the file you downloaded
# We unzip into the /opt/opendj directory
unzip opendj_2.7.0-120140727_all.zip -d /opt/opendj
{% endhighlight %}


### Configuration ###

Now that it is installed into the directory, we can run the setup
{% highlight bash %}
sudo /opt/opendj/setup --cli
{% endhighlight %}

Now, for configuration, there are a few things you need to know about LDAP:

* First is that there is a "root" user like in Linux.  OpenDJ defaults it to `Directory Manager`. We changed it to root.
* Second, each entry has a common name to it.  This is `cn`.  So if you want the root to be called `root`, you type `cn=root`.
* Third, you need a domain name for ldap.  For example, you might access your Shiny server application on `example.com`.

With the last one, you would probably want `ldap.example.com` to be your ldap server. Next set up your DNS on your domain name registrar to point `ldap.example.com` to your server.  While configuring, either keep `cn=Directory Manger` or change it to something like `cn=root` or `cn=admin`.  For FQDN, set it to your domain you have pointing, `ldap.example.com`.  Keep the ports as the default and create base DNs for your server.

Now, it will ask you to `Provide the base DN for the directoyr data: `.  What this means is you need to convert your FQDN (ldap.example.com) into the LDAP entry. Each section in the domain name separated by periods gets separated.  For `ldap.example.com`, it would be `dc=ldap,dc=example,dc=com`.  If your site is `ldap-mynewdomain.org`, it would be `dc=ldap-mynewdomain,dc=org` and so forth.  Finally, since we don't have any data to import, just choose `Only create the base entry`

The next part of the configuration is setting up SSL.  SSL is much more secure, but takes a bit longer to set up.  If you already have an SSL certificate to use, then you'll need to import into a Java key store.  I'll explain how to do that in a bit. If you don't have one yet, you have the advantage of being able to create a Certificate Sign Request (CSR) in Java.  For now just choose self-signed certificate.  Next start up the server with the configuration.

#### Importing SSL Certificate####
So, let's say you already have a SSL certificate for either a wildcard or a multiple domains.  The first thing you need to do is get both the certificate file and private key on your server.  You can do that via SCP. If you don't know how to do that, you can read about it [here][scp].

If you have a file called `key.pem` and `cert.crt`, the first thing you need to do is convert the `.crt` file to `.pem`.  Luckily this is easy by running the following.
{% highlight bash %}
openssl x509 -in cert.crt -out cert.pem -outform PEM
{% endhighlight %}

Now you will need to import it.  There is a Java program to do this.  Follow the instructions and download the program located [here][importkey].

Finally, to get SSL working with opendj, you need to run this:
{% highlight bash %}
/opt/opendj/bin/dsconfig \
set-trust-manager-provider-prop \
--hostname ldap.example.com \
--port 4444 \  # this is the admin port
--bindDN "cn=root" \  # this could be "cn=Directory Manger"
--bindPassword password \ # whatever you set the above password to
--provider-name JKS \
--set enabled:true \
--set trust-store-file:/home/user/keystore.ImportKey \ # this is wherever you stored the keystore file.
--set trust-store-pin-file:config/truststore.pin \
--trustAll \
--no-prompt
{% endhighlight %}

#### Create new SSL Certificate ####
We recommend to follow [this][new_certificate] guide to create a new certificate.


### Add new entries ###
With all the configuration setup behind us, we can begin to add new entries.  The way we have it setup is illustrated in the following graph.
{% picture post-images 1-ldap-shiny.png %}
The top level is already complete with the base entry.  You can make sure by running this command:
{% highlight bash %}
/opt/opendj/bin/status
{% endhighlight %}

With LDAP, you create new entries by creating a file called a ldif file which contains all the information for one or more entries.  Then you send the file to the ldap server.  You can do this from anywhere that has ldap-tools installed.  You can then delete the file or save it somewhere to hang on to.  If you ever want to modify an entry, you also create an ldif file.  So, fire up your favorite text editor and let's start writing our first ldif file.  For me, the tool of choice is the great VIM.

Here's what the first file looks like:
{% highlight bash %}
# Adds the people unit
# Make sure the 'P' is capitalized
dn: ou=People, dc=ldap, dc=example, dc=com
ou: People
description: All the clients for the application
objectClass: organizationalUnit

# Adds the first user underneath the People
# 'uid' is the login.  So you could put an email or username for it.
dn: uid=username, ou=People, dc=ldap, dc=example, dc=com
objectClass: inetOrgPerson
cn: Evan Farrell
sn: Farrell
uid: username
mail: evandev@gastrograph.com
ou: paid

#Adds a second user
dn: uid=username2, ou=People, dc=ldap, dc=example, dc=com
objectClass: inetOrgPerson
cn: Robert Test
sn: Test
uid: username2
mail: anotheruser@example.com
ou: paid

# Adds the Groups unit
dn: ou=Groups, dc=ldap, dc=example, dc=com
objectClass: organizationalUnit
ou: Groups
description: the groups

# Adds the paid group underneath Groups
dn: cn=paid, ou=Groups, dc=ldap, dc=example, dc=com
cn: paid
objectClass: groupOfUniqueNames
uniqueMember: uid=username, ou=People, dc=ldap, dc=example, dc=com
uniqueMember: uid=username2, ou=People, dc=ldap, dc=example, dc=com
{% endhighlight %}

To go over some of the syntax:

* `dn` means distinguised name. It's a unique name marking the tree format.
* Everything needs an objectclass.  The three used are organizationalUnit, inetOrgPerson, and groupOfUniqueNames (unit, user, and group)
* `cn` means common name.  The User's name.
* `sn` means surname.  So the User's lastname
* `uid` means userid.  This could be a username or even email address.  It is what is used to login.
* In order for the user to be found within a group, you need a uniqueMember field for each user.

Now, to get it into the ldap database we run this command on our server.
{% highlight bash %}
/opt/opendj/bin/ldapmodify -a -f <ldif-filename> -D "cn=root"
# Then enter password
{% endhighlight %}

If you are on a separate server, or you want to add new entries from your personal computer, using ldap-tools, you can run this command:
{% highlight bash %}
# change the ip to match either your domain name or your server IP.
ldapmodify -a -H ldap://100.10.0.5 -D "cn=root" -W -f <ldif-file>
{% endhighlight %}

So, now that we have the first two users into our system, what happens if we want to add more?
Well we make a new ldif and send that to the server.  The first file below adds a new user, the second edits an existing user
{% highlight bash %}
# Add a new user item
dn: uid=username3, ou=People, dc=ldap, dc=example, dc=com
objectClass: inetOrgPerson
cn: Fred Sample
sn: Sample
uid: username3
mail: user3@example.com
ou: paid

# then add them to the paid group
dn: cn=paid, ou=Groups,dc=ldap, dc=gastrograph, dc=com
changetype: modify
add: uniqueMember
uniqueMember: uid=username3, ou=People, dc=ldap, dc=example, dc=com
{% endhighlight %}

{% highlight bash %}
# edits the first user
dn: uid=username, ou=People, dc=ldap, dc=example, dc=com
changetype: modify
mail: newemail@example.com
{% endhighlight %}

Then you run the same commmand as above.


So, you see, learning to add new entries on ldap can be tedious.  Now that our server has users and it is up and running, the last thing to do is to configure our Shiny Server.

The following is what a configuration file would look like for our Shiny server application at example.com
{% highlight bash %}
run_as shiny;
access_log /var/log/shiny-server/access.log default;

server {
  listen 443;
  ssl /etc/shiny-server/ssl/my-key.pem /et/shiny-server/ssl/my-cert.crt;

  location /app {
    site_dir /var/www/myapp;

    log_dir /var/log/shiny-server;

    # The group you made in ldap that you want
    # to be able to access shiny
    require_group paid;
  }
}
# The important section
auth_ldap ldaps://ldap.example.com/dc=ldap,dc=example,dc=com {
  group_search_base ou=Groups;
  user_search-base ou=People;
  user_bind_template "uid={username},ou=People,{root}";
  group_filter "uniqueMember={userDN}";
# If it isn't working, add this to test to see if its an ssl problem.
  check_ssl_ca false;
}
{% endhighlight %}

When running the server, if you are having problems with connecting, you can run the server with `SHINY_LOG_LEVEL=TRACE`

There you have it.  Those are the basics of setting up an ldap server to use with Shiny.

If you’re a producer of beer, coffee, or spirits who wants to benefit from quality control, sign up for our 31 day free trial [here][trial-link]. If you’re a developer passionate about craft products and want to apply your programming to sensory analysis, check out our openings [here][hire].



[opendj_download]: http://forgerock.org/downloads/opendj-builds/
[scp]: http://www.hypexr.org/linux_scp_help.php
[importkey]: http://www.agentbob.info/agentbob/79-AB.html
[new_certificate]: http://opendj.forgerock.org/opendj-server/doc/admin-guide/index.html#new-ca-signed-cert
[trial-link]: /pricing.html
[hire]: /jobs.html
