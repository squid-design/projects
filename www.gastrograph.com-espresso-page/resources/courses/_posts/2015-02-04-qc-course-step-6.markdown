---
layout: course
title: Step 6 - Generate Enough Data
short_title: Step 6
subtitle: Generate enough data
tags: Quality Control Course Email QC
date:   2015-02-04
author:
  - Jason Cohen
description: Generating data is the last step in implementing a quality control program at your company.
---
<style>
  tr td:empty, th:empty {
    width: 50px;
  }
</style>
<div class="row">
  <div class="col-sm-8 center-vertical"><h2>Step 6: Generating data</h2></div>
  <div class="col-sm-4 center-vertical"><img class="img-responsive" src="/assets/images/qc-email-course-images/step-6.png"/></div>
</div>

<br>

Your results are only as good as the data you collect – and higher-quality data will always give you a better metric to judge the quality and variations of your product. Be careful about collecting more data simply for the sake of "more". Data collection is often time and resource intensive. Only high-quality data will help you build a robust and successful quality control program at  << Test Company >>.

It is important to know and plan for the amount of data required for enough ‘statistical-power’ in your chosen test to achieve your desired results. Certain tests, such as the triangle test, have low data requirements for statistical-power but lack in specificity. Other tests, such as Descriptive Analysis, require huge amounts of data, but are incredibly specific in their ability to flag specific flaws, taints, and contaminations under a variety of conditions – if you have the infrastructure to analyze the results within your decision time frame!
> Know how much data each test requires, and collect at least 25% more to account for potential outliers or contaminated reviews.

Deciding which tests to implement with your quality control program will require you to honestly assess how many reviews of each product your panel can complete per batch.  The best quality control programs will generate twice as much data as needed and apply robust outlier detection to protect themselves from false positives and false negatives when testing for problems and batch deviations. The basic steps for high-quality data-generation are:

  1. Know how much data you need for statistical significance – depending on your test, this can be looked up from tables available online
  2. Collect at least 25% more data than the stated minimum – 2x more data than is required will guarantee the best results
  3. Lookout for variations in the amount of data you collect – large swings in the amount of data you collect can cause false positives and negatives
  4. Never change tests, sample size, serving cups, or serving temperature during a test – once it's set, stick with it, as changing could lead to missing a batch variation or pulling an OK batch.
  5. Avoid changing panelists from one test to another if possible!

**Common Sources of Variation include:**
<div class="row">
    <div class="col-md-6">
        <ul>
            <li>Sample Size</li>
            <li>Time of Day</li>
            <li>Day of Week</li>
            <li>Time Between Samples</li>
            <li>Music</li>
            <li>Weather</li>
        </ul>
    </div>
    <div class="col-md-6">
        <ul>
            <li>Season</li>
            <li>Sample temperature</li>
            <li>Order of tastings</li>
            <li>Quiet vs. loud environments</li>
            <li>Room lighting</li>
            <li>Palate contamination from successful identification</li>
        </ul>
    </div>
</div>


A successful quality control program must mitigate and reduce these sources of variation in order to generate robust and statistically significant data capable of flagging flaws, taints, contaminations, and batch variations! The best quality control programs create a checklist, similar to the one above, and record changes in the environment, location, or weather alongside each review. Often it can take 2 – 5 years for this data to became usable, but it can help to triage and reduce these problems from day one.

<br>
<hr>
<br>
###Our method:
Gastrograph Review for [iOS][ios] and [Android][android] collects thousands of environmental variables, such as weather, volume, light, and time,  during your panelists’ reviews – reducing and controlling for the most common (and least common) sources of variation in your tastings. By measuring and controlling for these effects, the Gastrograph system can monitor for flaws, taints, contaminations, and batch variations in real time while relying on less data.

<table style="margin: 2% auto;">
  <thead>
    <tr>
      <th>Type of Test</th>
      <th></th>
      <th>Reduction in Data Need</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Difference Tests</td>
      <td></td>
      <td>30.25%</td>
    </tr>
    <tr>
      <td>Magnitude Estimation</td>
      <td></td>
      <td>78.22%</td>
    </tr>
    <tr>
      <td>Descriptive Analysis</td>
      <td></td>
      <td>98.67%</td>
    </tr>
  </tbody>
</table>

Read our Hierarchical Data Modeling Through Projection in High Dimensional Space white paper to learn more!

The Gastrograph System further reduces the need for data by applying hierarchical data modelling to flag current and potential flaws, taints, and contaminations in your product.  We apply data, knowledge gain, and insight from all of the products in our database, such as all American IPA’s for beer; or all low-altitude, Central American, Yellow-Bourbon varietals for coffee. This reduces our need for specific reviews of your product in developing our baseline and training flaw alerting models.  Our hierarchical data models can start generating valuable quality control metrics from the first 10 reviews of your products.  We further reduce our data requirements by building other data-models on your consumers, panelists, and consumption environments.

To learn more, take a look at our [Resources section!][link-learn]

<br>
<hr>
<br>

[link-learn]:   /resources/index.html
[link-science]: /how-it-works.html
[android]: https://play.google.com/store/apps/details?id=com.gastrograph.testggapp&hl=en
[ios]: https://itunes.apple.com/us/app/gastrograph-review/id923512201
