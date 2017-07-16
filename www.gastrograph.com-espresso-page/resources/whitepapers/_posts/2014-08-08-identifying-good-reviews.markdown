---
layout: whitepaper
title: Quantifying Reviewer Trust
short_title: Quantifying Trust
short_description: Identify trustworthy reviewers through model building
subtitle: Identifying Reviewers as Trustworthy Through kNN
snippet: A single Gastrograph review is not based solely on the product’s perceived flavor; there are many factors that will affect the review.  Trust scores for reviews serve as a weighting mechanism between different reviews.  By using reviewer experience and comparing a user’s review to older reviews, it can be seen if a person reviewing is doing their best job on the review.  Are they sick, stressed, or palate-fatigued?  All of these factors change the way a person reviews, so how do we account for that?
tags: kNN trust
date: 2014-08-08 12:00:00
author:
  - Arturo Leon
  - Jason Cohen
description: Application of kNN to quantify trust per product review
redirect_from:
 - /learn/whitepapers/identifying-good-reviews.html
---
Production managers, sensory experts, and quality control professionals use the Gastrograph system to find and detect flaws or batch variations in their products. Though all of our clients are serious about the flavor profile and consistency of their products, and review with a critical palate, not all reviews are of equal trust and weight. Any single Gastrograph review is not solely dependent on the product; the reviewer’s experience, preferences, environment, and health all play a role in their response to flavor.

Trust is important for our clients, because they are interested in how much trust they can place in a product review (\\(r\\)). For example if they were to ask us for a report on a product \\(X\\) then we would provide them with the Objective Flavor Profile and the Perceived Quality, both of which are computed from among the trusted reviews (I will explain how I determine which reviews are trustworthy). So in short our clients can get a concrete flavor analysis on \\(X\\) computed with trust based weights derived from the reviews.

I will outline how we compute trust by carrying out an analysis on the reviews for product \\(X\\). We'll take some detours to explain the differences between a model based strictly on the amount of reviews someone has completed versus a model that is consistent with the amount of reviews completed but additionally based on the character of the flavor profiles.

Product \\(X\\) has a set of 4 distinct quality control experts who have produced 700 \\(r\\)s for \\(X\\). Where \\(r \in Review~Space := \{[0,5]}^{24}\times(Review~Number)\\), \\(\ Review~Number = (0,\infty)\\). \\(Review~Number~(RN)\\) is the number of reviews that the reviewer or \\(r\\) has completed. \\(RN\\) is an absolute count, so it counts from the first \\(r\\) a reviewer has submitted for \\(X\\). Being that our reviewers are quality control professionals we can safely assume that our "distribution" in \\(Review~Space\\) is a good profiling of \\(X\\). Therefore any \\(r\\), regardless of reviewer, that “breaks” away from our distribution can be considered a poor review.

I am using k-Nearest Neighbors (kNN) to uncover the distribution of our data for \\(X\\) to ultimately to quantify trustworthiness amongst our reviews. In order to apply kNN first one must have classified data or labeled data. Therefore I classified a subset, \\(Validation~Set\\), of our data into three non-overlapping groups. Each group represents a level of experience for our reviews. The three groups can be seen as most \\((\mu)\\), average \\((\alpha)\\), and least \\((\lambda)\\) experienced. The strict classification by \\(RN\\) is a reflection of a naive classification of reviews into experience groups. Therefore kNN will serve as an improvement to a naive understanding of experience.

I applied kNN with 10-fold cross validation on the classified \\(r\\) but I exclude \\(RN\\). I excluded \\(RN\\) so that structure of the group depends on the flavor alone. However thanks to the preliminary classification of reviews by \\(RN\\) the classification rules will be \\(\bf{consistent}\\) with \\(RN\\). In short the distribution kNN will compute will be indirectly depending on \\(Review~Number.\\) Below I have the plots of the two competing models for trustworthiness when applied to unlabeled reviews of \\(X\\), as well as the results of classifying the \\(Test~Set\\) by the validation set.

{% picture post-images post-images/1-quantifying-08-08.png  %}

{% picture post-images post-images/2-quantifying-08-08.png  %}

{% picture post-images post-images/3-quantifying-08-08.png  %}

One can see that kNN has been successful because of the results on \\(Test~Set\\). In our results we can see there are \\(r\\)s whose \\(RN\\) are low but are still considered trustworthy reviews, and therefore are members of subset \\(\mu\\). In other words we can trust such a review based on the reviewer’s ability to perceive flavor, not only the amount of reviews he/she has completed. I ultimately want to classify \\(r\\)s as the second method illustrates because reviewers have unique flavor tolerances and learning curves. In my model it’s completely possible that reviewers \\(A\\) and \\(B\\) may have the same amount of reviews completed but may not have the same amount of “experience”, which is not an uncommon real world scenario. This model accounts for a reviewer’s previous tasting experience. The previous flexibility and descriptive power is impossible in a model that is strictly based on \\(RN\\).

Now I will outline how I will quantify trust per \\(review\\) for \\(X\\):
Since kNN works well on our test set, I applied kNN to all our data for \\(X\\). Then I determined the medoid for all \\(r \in \mu\\) , and then I ran a similarity analysis that compared every data point from our data set to \\(m := medoid~of~\mu\\). The medoid of \\(\mu\\), \\((m)\\), is the data point in \\(\mu\\) such that:

\\[\sum \limits \_{j~=~\mu} d(m, r\_j) \leq \sum \limits \_{j~=~\mu} d(r\_i,r\_j)\\]

Where \\(r\_{i}\\) is the ith member of \\(\mu\\) and we are using the Manhattan metric to compute distance.
In other words the average and the medoid only differ in that the medoid has to be a data point and the average does not, and frequently isn’t a point in our set. I picked the medoid exactly because it belongs to our data set, so that our "best” reviewer has a score of 100.

The results from the similarity analysis will be used to compute the Trust function whose results will be ranged from 0 to 100.

Below are the results of the trust computation per reviewer.

{% picture post-images post-images/4-quantifying-08-08.png  %}

{% picture post-images post-images/5-quantifying-08-08.png  %}

{% picture post-images post-images/6-quantifying-08-08.png  %}

{% picture post-images post-images/7-quantifying-08-08.png  %}

Naively one believes that trust in a quality control specialist should grow in time or stay constant. The model produces a desirable upward trend.

In conclusion, my approach to the problem exploits the power of kNN so that the structure of our data can dictate which \\(r\\)s are the most trustworthy \\(r\\)s. If you are curious as to how the similarity analysis is carried out and the definition of the Trust function, then submit an application to [join our team][jobs].

Future work to produce a more accurate model of Trust would require incorporating \\(RN\\). So far I have considered two similar approaches: i) apply a transformation to \\(RN\\) and include \\(RN\\) in my \\(Review~Space\\) ii) to determine a metric, for \\(Review~Space \times RN\\), that would “properly weight” \\(RN\\). The transformation would \\(RN\\) to a scale from 0 to 5, the same scale flavor is measured on. Then I would add \\(RN\\) as another axis in \\(Review~Space\\) and I would prep my data and compute trust values in exactly the same way I have outlined earlier. I practice I would need to test out various transformations and see if it improves our models by plotting \\(Trust~vs~RN\\). There has been work done in metric learning that I will apply to our data.

As far as metrics go the Manhattan metric is biased towards the \\(RN\\) because \\(RN\\) has no upper bound and in our example ranges from 0 to 300. So my aim is to determine a metric which produce more accurate classifications, well work has been done towards that end. A metric is learned from our data such that it maximizes distance between points that should not be classified together and minimizes distance between points that should be classified in one group.
[jobs]:/jobs.html
