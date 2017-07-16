---
layout: post
title:  "Synchronizing DynamoDB and MySQL"
tags: dynamodb migrate mysql migration
date:   2015-07-10 18:21:54
author:
  - Will Rose
description: Using golang to Synchronize DynamoDB and MySQL
---
##Synchronizing DynamoDB and MySQL

When data comes into our system, it is put into Amazon’s DynamoDB, which is efficient for most of our operations. The Gastrograph app shows users their previous reviews, and this data is easy to access using the username as a hash key and the review time as a range key. Nevertheless, our system depends on data processing, which is done in R and is much easier using SQL. Therefore, we need a copy of our raw data in MySQL which is then filtered and processed by our machine learning algorithms.

<!--more-->

Of course, the obvious problem with this system is that it requires us to keep our SQL tables in sync with our Dynamo tables. The initial approach we took to this problem was to scan the entire Dynamo database and then migrate the entire thing over to MySQL every fifteen minutes. This solution was sufficient for small amounts of data, but it very clearly will not work at scale. So we decided to come up with a new approach.

The new approach depends on Dynamo’s ability to add secondary indexes to existent tables. We used this feature to add a new index which would indicate whether that row had been migrated. Then we designed our program to continuously query the Dynamo database for rows which have this migrated key set to false. We then copy these rows to MySQL and update the value of their migrated key to true.

Another problem with syncing these two types of databases is that they index in different ways. Dynamo is built such that each row is indexed by a hash key and a range key which are only necessarily unique when together, but there can be, and probably should be, multiple instances of a given hash key and range key. MySQL, however, is built to take one unique primary key, and if we continue to try to index by hash and range, we could potentially end up with duplicates of a row without knowing it. Therefore, once we add a row to MySQL, we get the index of that row and update the Dynamo row to include this value, which ensures that each row in Dynamo corresponds uniquely to one row in MySQL. In essence, we have created one data structure out of these two distinct databases by linking each row together.

Ultimately, not only is this system better from an architecture perspective, but it is also much more efficient. As the Dynamo API emphasizes, table scans are not efficient and should be avoided if at all possible. The old system depended entirely on table scans. Even if there were only 10 more reviews over a fifteen minute period, the program would still scan and migrate the entire table. The new table depends on querying, which is much faster. I ran some timing tests on my machine, using local versions of both MySQL and Dynamo, and got the following results.

<table class="blog-table table table-striped table-hover">
  <tr>
    <th>Num. Rows in Dynamo</th>
    <th>Num. Rows in MySQL at Start</th>
    <th>Time of Old System(s)</th>
    <th>Time of New System(s)</th>
  </tr>
  <tr>
    <td>1,000</td>
    <td>0</td>
    <td>7.99</td>
    <td>7.18</td>
  </tr>
  <tr>
    <td>10,000</td>
    <td>0</td>
    <td>94.30</td>
    <td>103.75</td>
  </tr>
  <tr>
    <td>10,010</td>
    <td>10,000</td>
    <td>4.16</td>
    <td>0.23</td>
  </tr>
</table>

This shows that the new code is roughly equivalent, if not slightly slower, when moving large amounts of data. This makes sense, though, because in that case our query is basically a scan, and then we have to upload it again with the new migrated key. The new system would never have to operate like that, and the more likely instance is the last instance, where it has to upload a few elements to MySQL compared to a lot which have already been uploaded. The most surprising result of this test is how well the old system performed in the 10,010 scan. It had already scanned the first 10,000, and then I ran it again to scan the additional 10, and it took significantly less time. This implies that Dynamo caches previous scans in some way, since scans continued to be fast even after restarting my whole system. Nonetheless, our new system is clearly faster when it is used to migrate small amounts of new data compared to the much larger total, which is precisely how it works in operation.