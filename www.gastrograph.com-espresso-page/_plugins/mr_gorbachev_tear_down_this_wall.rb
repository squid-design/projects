module Jekyll

    class NoWallPageGenerator < Generator

        safe true

        def generate(site)
            @site = site
            process_posts
            process_pages
        end

        def process_posts
            @site.posts.each do |post|
                unless @site.config['subscribe_wall']['layouts'].nil?
                    @site.config['subscribe_wall']['layouts'].each do |wall|
                        @site.layouts.keys.each do |key|
                            if key == wall
                                if @site.layouts[key+"-show"].nil?
                                    @site.layouts[key+"-show"] = @site.layouts[key].dup
                                    @site.layouts[key].content += '{% include mailchimp_access.html %}'
                                end
                                if post.data['layout'] == key
                                    @site.posts << AliasPost.new(@site, @site.source, post.dir, post.name, key + "-show", post.dir + "-show")
                                end
                            end
                        end
                    end
                end
            end
        end

        def process_pages
            @site.pages.each do |page|
                #generate_aliases(page.destination('').gsub(/index\.(html|html)$/, ''), page.data['alias'])
            end
        end
    end
    class AliasPost < Post

        def initialize(site, source, dir, name, layout, permalink)
            @site = site
            @dir = dir
            @base = self.containing_dir(source, dir)
            @name = name

            self.categories = dir.downcase.split('/').reject { |x| x.empty? }
            self.process(name)

            self.read_yaml(@base, name)

            self.data["layout"] = layout

            title = CGI.escape(slug)
            self.data["permalink"] = permalink 

            if self.data.has_key?('date')
                self.date = Time.parse(self.data["date"].to_s)
            end

            self.populate_categories
            self.populate_tags
        end

        def destination(dest)
            path = Jekyll.sanitized_path(dest, URL.unescape_path(url))
            path = File.join(path, self.slug + ".html") if path[/\.html$/].nil?
            path
        end
    end
end
#            unless site.config['subscribe_wall']['pages'].nil?
#                site.config['subscribe_wall']['pages'].each do |wall|
#                    site.pages.each do |page|
#                        if pp page.url == wall
#                        end
#                    end
#                end
#            end
