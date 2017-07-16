---
layout: whitepaper
title: Classifying Reviewers by Experience
short_title: Reviewer Experience Levels
short_description: How to classify reviewers' tasting experience
subtitle:  Modeling The Evolution of Reviewer Experience
snippet: Identifying experienced tasters within a quality control/assurance team is important to our clients as their opinions are valuable. For example, a brewery is considering a change to their brewhouse equipment - they would seek the most experienced reviewer and ask him/her how the new equipment will affect their product’s flavor profile. This paper will outline how we model the latent classification of reviewer experience over time. At the heart of the issue is creating a model to identify which individuals in a panel are the most experienced tasters - and weight their reviews accordingly.
tags: kNN experience
date: 2014-10-02 12:00:00
author:
  - Arturo Leon
  - Jason Cohen
description: Classification of reviewers with respect to experience
redirect_from:
 - /learn/whitepapers/classifying-reviewers.html
---
Identifying experienced tasters within a quality control team is important to our clients as their opinions are valuable. For example, a brewery is considering a change to their brewhouse equipment. They would seek the most experienced reviewer and ask him/her how the new equipment will affect their products flavor profile.
This paper will outline how we model the latent classification of reviewer experience over time. At the heart of the issue is creating a model to identify which individuals in a panel are the most experienced tasters - and weight their reviews accordingly.

The obvious approach is to ask the reviewer with the most reviews, lets call this reviewer X. Reviewer X may have the most reviews but the majority are of only two products. Another reviewer named Y has the most variety of product reviews, but has fewer reviews than X. Management could survey the tasting teams opinion regarding the new equipment, but due to time constraints, this is typically not the case. In turn, management would have to blindly pick a taster or decide without input from a tasting team; both are very poor options. With the development of Gastrograph, Analytical Flavor Systems can identify the most experienced reviewer on a team.
Various methods have been applied in an attempt to classify reviews with respect to experience. The Partitioning Around the Medoids (PAM) algorithm under various metrics and several cluster numbers was applied but did not prove to be successful. In order for PAM to be successful, a transformation needs to be determined or we learn a metric from our data to properly weight our reviews. Linear and Support Vector regression techniques were applied in an attempt to predict Review Number, however, these methods proved to be ineffective. K Nearest Neighbors (kNN) was successfully applied to our data. The next section will discuss how kNN is carried out before discussing its application to our reviews.

**Background - kNN**

Consider two sets of data \\(Classified\\) and \\(Unclassified\\). We wish to assign a class to all members of the set \\(Unclassified\\). In other words we want to discover the requirements for membership for each class in \\(Classified\\). Then classify the elements in \\(Unclassified\\) accordingly. kNN addresses the problem indirectly by first considering \\({ u \in Unclassified}\\) and the k nearest elements to \\(u\\) who belong to \\(Classified\\). Nearness can be determined either by distance or a context specific similarity metric. In this case, the Manhattan distance will be used as our metric. For the non-technical reader, the Manhattan the distance between two points *a, b* in “four dimensional space” is:

\\[\sum\_{k=1}^4 \begin{vmatrix} a\_k - b\_k \end{vmatrix} \\]

Then u is classified as the mode of the class of the k nearest elements in \\(Classified\\). The intuition behind the algorithm is: elements that are “close” to each other should be of the same class. The process can be visualized in the image below.

{% picture post-images post-images/1-classifying-10-02.png "" %}

In the image above, the green circle is an unlabeled data point. If k = 3, the circle would be labeled as a red triangle because that is the mode class of the 3 nearest labeled data points. If k = 5, the circle would be labeled as a blue square because three of the five nearest points are blue squares.

**Results and Analysis**

In order to apply kNN to all of our coffee reviews, we must first classify the training/validation set (which is 80 % of all our data, the remaining 20% will be the testing set) by Review Number into three mutually exclusive classes. Review number is used so that the classification carried out by kNN is a reflection of experience. The classes are plotted below:

{% picture post-images post-images/2-classifying-10-02.png "" %}

Our flavor variables range from 0 – 5, while Review Number ranges from 1 – 600. If kNN is applied to the data without scaling Review Number, the results would be similar to our previous labeling. Instead we scale Review Numbers have been scaled so that it now ranges from 0 to 5. The results of the cross validated kNN model applied to the scaled data are displayed below.

{% picture post-images post-images/3-classifying-10-02.png "" %}

Clearly, the results are not very good. So exploratory analysis was conducted, and it turned out that the data had many unique products with less than 5 reviews. This accounted for about 15% of the data, and so these reviews were removed. Consequently, the results were much better. (Red dots are the outliers in our data)

{% picture post-images post-images/4-classifying-10-02.png "" %}

In order to understand why some reviews are seemingly mislabeled, reviewer X’s submissions will be examined. Reviewer X has 5 years of sensory quality control experience, but is new to the system. (A common scenario amongst clients.) Reviewer X’s reviews are plotted below.

{% picture post-images post-images/5-classifying-10-02.png "" %}

X would have been labeled as average in terms of experience by the naive classification. The new results do not suffer from this shortcoming. Further analysis reveals that the majority of Reviewer X’s submissions are in group 3 - and after the 90th review, nearly all reviews are labeled into classes 2 and 3. In other words, Reviewer X was reviewing comparable to people with a higher Review Number because of experience. Thus, kNN is able to properly classify reviews submitted by tasters with prior experience, as well tasters whose reviews are similar to inexperienced tasters. It should be noted that certain reviews from an experienced taster can be classified as lower experience due to other factors such as distraction or palate fatigue, such as the reviews in the 250 region marked at the lowest experience score of 1.

Given the fashion in which the data was labeled and the nature of the results, we can now view these groups as, 1:= least experienced (lambda), 2:= average experience (alpha) and 3:= most experienced (mu).

Next, the test set was labeled by the seven nearest neighbors from the training set.

{% picture post-images post-images/6-classifying-10-02.png "" %}

The average Review Number is compared for the experience groups in both of the test and training sets.

<div>
$$
\begin{array}{c|lcr}
\text{} & \text{Test} & \text{Train} \\
\hline
Class~1 & 161 & 158 \\
Class~2 & 246 & 230 \\
Class~3 & 298 & 284
\end{array}
$$
</div>

**Conclusion and Applications**

From our analysis it can be concluded that we have found a satisfactory method of labeling reviews by experience, and by extension the reviewers who submitted them, has been found. This new method can now be used to improve and streamline other tools that have been developed. For example we can now compare the sensitivities and biases of experienced and novice reviewers. Therefore studying the evolution of flavor sensitivity over time. We have updated our objectives for a model for consistency by requiring that the average consistency of experienced reviewers should be high. We will build on our experience classifier by developing an experience coefficient as a way to quantify experience.
