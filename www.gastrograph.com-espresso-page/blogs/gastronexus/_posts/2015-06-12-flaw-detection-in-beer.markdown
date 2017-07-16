---
layout: post
title: Using Machine Learning and Artificial Intelligence to Detect and Identify Flaws in Beer
tags: beer flaw machine learning quality control
date: 2015-06-12 17:34:11
author:
  - Zachary Bushman
description: Detecting Beer Flaws Using Machine Learning
---
####Introduction

Currently, the best method for sensory quality control (QC) in beer is to have highly trained tasters review products as they come off the line.  These reviewers need to be constantly training themselves to identify flaws taints and contaminations in beer.  Often, these skilled reviewers use a flavor wheel of some sort with reference flavors arranged around it to help them describe and rate the beer.  On the other hand, there are some producers who offer significantly less training to their tasters.  Tasters basically just decide whether or not the beer is good enough to ship.

To become a trained taster is a time and energy-intensive process.  First, tasters must learn how to properly taste a beer.  It should be pointed out that tasting a beer is much different from just drinking a beer.  Obviously, the flavor of the beer is perceived by someone who merely drinks a beer, but it is not analyzed completely.  Professional tasters are taught to examine all of the nuances and characteristics of the beer.  They note how the flavor changes as the beer is drank.  Tasters must learn what each flaw tastes like and how to identify them.  They must also learn what characteristics to expect in different styles.  Professional tasters who judge beer competitions must be familiar with the appearance, aroma, flavor, mouthfeel, ingredients, and commercial examples of each of more than 100 styles of beer.  They must also know precisely how beer is made, some history of beer, and what language to use to accurately describe the flavor of a beer.  Beer tasters at a brewery don’t necessarily need to know all of that information about each and every style of beer, but they should be very familiar with the styles of beer that they make.

<!--more-->

In sensory QC, people are the analytical instruments used to determine the quality of the beer, and instruments need to be calibrated.  For tasting, that calibration is making sure that tasters are constantly reminded of what flaws taste like and what flawless beer should taste like.  It is possible that people forget how to identify a flaw.  This could cause potential problems in misjudging what a flaw is or completely missing a flaw.  The Gastrograph Review system allows for the removal of this problem.

By using machine learning and artificial intelligence algorithms, Analytical Flavor Systems has removed the need for tasters to even know what a flaw tastes like.  Of course if they do know what the flaws taste like, that is all the better - there is a feature that allows users to flag certain flaws in a beer.  The Gastrograph System learns what combinations of flavors are indicative of different flaws through training.  Initial reviewers are given a beer that has been flawed purposefully, then taste the beer and indicate what they have tasted in the app.  Our data scientists then use algorithms to build models of flaw flavor profiles from these reviews.  Only some of the reviews are used to build the models because some must be used to test the model and show that it works.  You cannot use the same review for both building and testing a model.

####Experiment:

To build our algorithms and models, the team at Analytical Flavor Systems had to drink many a beer.  And before you think it was all fun and games, let me tell you - it wasn’t.  Three quarters of the beers we tested had flaws, and as you can probably guess, the flaws do not taste good.  The design of the experiment is to try each of the 20 most common flaws as designated by Flavoractiv™.  These flaws can be seen in Table 1 below.

<strong>Table 1: The 20 most common flaws, taints, and contaminations in beer as determined by Flavoractiv.  Shown are the products under the names which Flavoractiv sells them, the identities of the compounds of interest, flavor notes, and the flavor thresholds for each flaw.</strong>
<table class="blog-table table table-striped table-hover">
  <tr>
    <th>Product Name</th>
    <th>Compound</th>
    <th>Flavor Notes</th>
    <th>Flavor Threshold</th>
  </tr>
  <tr>
    <td>Acetaldehyde</td>
    <td>Acetaldehyde</td>
    <td>Aldehydic, bruised apples, emulsion, paint</td>
    <td>5-15 ppm</td>
  </tr>
  <tr>
    <td>Acetic</td>
    <td>Acetic acid</td>
    <td>Acid, vinegar, pungent, sherry-like</td>
    <td>90 ppm</td>
  </tr>
  <tr>
    <td>Butyric</td>
    <td>Butyric acid</td>
    <td>Rancid, baby sick, putrid</td>
    <td>2-3 ppm</td>
  </tr>
  <tr>
    <td>Caprylic</td>
    <td>Octanoic acid</td>
    <td>Goaty, waxy, tallowy</td>
    <td>4-6 ppm</td>
  </tr>
  <tr>
    <td>Catty</td>
    <td>p-menthane-8-thiol-3-one</td>
    <td>Blackcurrant leaves, ribes, tom-cat urine</td>
    <td>15 pptrillion</td>
  </tr>
  <tr>
    <td>Diacetyl</td>
    <td>Diacetyl</td>
    <td>Buttery, butterscotch, milky</td>
    <td>10-40 ppb</td>
  </tr>
  <tr>
    <td>DMS</td>
    <td>Dimethyl sulfide</td>
    <td>Sweet corn, creamed corn, cooked vegetables, tomato sauce, sea vegetables</td>
    <td>25 ppb</td>
  </tr>
  <tr>
    <td>Ethyl butyrate</td>
    <td>Ethyl butyrate</td>
    <td>Tropical fruits, mango, tinned pineapple</td>
    <td>400 ppb</td>
  </tr>
  <tr>
    <td>Ethyl hexanoate</td>
    <td>Ethyl hexanoate</td>
    <td>Estery, apple, aniseed</td>
    <td>200 ppb</td>
  </tr>
  <tr>
    <td>Freshly-cut grass</td>
    <td>Cis-3-hexenol</td>
    <td>Leafy, grassy, crushed green leaves, hedge clippings</td>
    <td>15 ppm</td>
  </tr>
  <tr>
    <td>Geraniol</td>
    <td>Geraniol</td>
    <td>Rose-like, floral, flower-like</td>
    <td>1/3 of population: 18 ppb <br> 2/3 of population: 350 ppb</td>
  </tr>
  <tr>
    <td>Grainy</td>
    <td>2-methyl propionaldehyde</td>
    <td>Green malt character, green, harsh</td>
    <td>10 ppb</td>
  </tr>
  <tr>
    <td>H2S</td>
    <td>Hydrogen sulfide</td>
    <td>Sulfidic, rotten eggs</td>
    <td>4 ppb</td>
  </tr>
  <tr>
    <td>Hop oils</td>
    <td>Hop oils</td>
    <td>Hoppy</td>
    <td>160 ppb</td>
  </tr>
  <tr>
    <td>Isoamyl acetate</td>
    <td>Isoamyl acetate</td>
    <td>Estery, fruity, banana, pear-drop</td>
    <td>1.4 ppm</td>
  </tr>
  <tr>
    <td>Light-struck</td>
    <td>3-methyl-2-butene-1-thiol</td>
    <td>Skunky, light-struck</td>
    <td>4 pptrillion</td>
  </tr>
  <tr>
    <td>Mercaptan</td>
    <td>Ethanethiol</td>
    <td>Drains, rotten vegetables, leeks, natural gas, durian</td>
    <td>1 ppb</td>
  </tr>
  <tr>
    <td>Metallic</td>
    <td>Ferrous sulfate</td>
    <td>Inky, blood-like, tinny</td>
    <td>1 ppm</td>
  </tr>
  <tr>
    <td>Papery</td>
    <td>Trans-2-nonenal</td>
    <td>Cardboard, oxidized</td>
    <td>50-100 pptrillion</td>
  </tr>
  <tr>
    <td>Phenolic</td>
    <td>4-vinyl guaiacol</td>
    <td>Spicy, herbal, clove-like</td>
    <td>200 ppb</td>
  </tr>
  <tr>
    <td>Sour</td>
    <td>Citric acid</td>
    <td>Acidic, lemon, sour, sour milk</td>
    <td>170 ppm</td>
  </tr>
</table>

Seven styles of beer were selected for preliminary testing.  These seven styles were chosen to be representative of several styles.  The styles chosen were American Pale Ale, Indian Pale Ale, American Brown Ale, Stout, Pilsner, and Dopplebock.  The beers in each of these styles were selected as those that closely fit the objective flavor profile of the style.  Also, the beers had to be consistent, and each batch was tasted before use in the flaw tasting panels.  This was done make sure the beer was free of any flaws, taints and contaminations that might skew the results when training the model.

Tasters were selected from a pool of employees at Analytical flavor systems and volunteers from the Tea Institute at Penn State.  These tasters were each trained at least minimally.  The training required to taste using the Gastrograph app is very minimal .The simplicity of the system means that almost anyone can use it to provide useable data for QC programs in breweries.  Each taster is also assigned a trust score using our proprietary algorithms.  This trust score is based on the number of reviews done by the taster as well as what kinds of products were reviewed and how sensitive they are to certain flavors.  Reviews are inherently subjective as a result of being based on taste.  The Gastrograph System also learns what each individual taster likes and dislikes as well as what flavors they are sensitive to.  This is then used to weigh their responses as they review products. By doing this, subjectivity is minimized in order to give a better idea as to the objective flavor of any reviewed product.

####Results and Discussion

The planned experiment is now completed for three of the seven beer styles of interest.  So far the collected data has been used to build and test models with a hit result of greater than 75% and some even as high as 99%.  As more data is collected, the models become more accurate.  As different styles are tested we will be able to find trends and patterns to apply across all styles and types of beer.  Of course there will be exceptions as not all compounds that are called flaws are recognized as a flaw in every type of beer.  For instance, the level of diacetyl that is acceptable in stouts is much higher than what would be considered a flaw in a pilsner, and most beers would be considered flawed if they contained citric acids but sour beers would not.

The models were built to separate flaws based on what flavors were affected by the flaw in question.  By examining differences in all 24 of Gastrograph’s flavor variables, models were able to differentiate between different flaws at a fairly high rate of accuracy with no chemical testing needed.  Table 2 shows the accuracy of this cross-validation techniques for determining differences between flaws.  The lowest accuracy found was 78.5% accuracy; this is only low because the flavors have many similarities.  By changing the method in which the models are built we should be able to increase the effectivity of the model.

<strong>Table 2: Accuracy of cross-validation techniques for different flaws in beer.</strong>
<table class="blog-table table table-striped table-hover">
  <tr>
    <th><strong>Target</strong></th>
    <th><strong>Accuracy</strong></th>
  </tr>
  <tr>
    <td><strong>Six Classes</strong> <br> (Mercaptan, buytric acid, DMS, ethyl hexanoate, trans-2-nonenal, Standard</td>
    <td>0.785</td>
  </tr>
  <tr>
    <td><strong>Two Classes</strong> <br> (Flaw, Standard)</td>
    <td>0.99</td>
  </tr>
  <tr>
    <td><strong>Five Classes</strong> <br> (Mercaptan, butyric acid, DMS, ethyl hexanoate, trans-2-nonenal)</td>
    <td>0.963</td>
  </tr>
</table>

####Conclusion

Our experiment has shown that we are able to build models to predict flaw presence and identity with relatively high accuracy.  Through the use of machine learning and artificial intelligence, self-updating and correcting algorithms have been developed to increase the effectiveness of sensory quality control in the brewery.  We plan to finish our experiment by spiking the remaining 4 beer styles with the 20 flaws purchased from Flavoractiv and reviewing them.  By increasing the amount of data collected, we can build more accurate models and discover which attributes are most important when detecting and identifying flaws.

Moving forward we hope to expand our study to include varying concentrations of each flaw so that the models will learn to quantify the amount of a flaw compound in a given beer.  Also, other styles of beer will be tested to increase the effectiveness of the models across all types of beer.  These algorithms can be applied to other applications, too.  The same exact system can be used to detect taints and flaws in any homogeneous food product.  It just requires the training of models with the food product and flaws in question.  Coffee and spirits are examples we are exploring.  We have already collected extensive data on unflawed samples of each of these.  The algorithms built, or similar algorithms, could be used in many other areas, i.e. imodel building for chemical analysis. This could be anywhere from QC to academic research.  It could be used to model the flavor response to a concentration change in any compound or set of compounds.  It could be used to model how proteins fold under different conditions as well.  Machine learning and artificial intelligence is the future of quality control.

####Sources:
  * <a href="https://cicerone.org/files/CBS_Syllabus_v2.pdf">https://cicerone.org/files/CBS_Syllabus_v2.pdf</a>
  * <a href="http://www.bjcp.org/docs/2015_Guidelines_Beer.pdf">http://www.bjcp.org/docs/2015_Guidelines_Beer.pdf</a>
  * <a href="http://www.flavoractiv.com/products_categories/beer-flavour-standards/">http://www.flavoractiv.com/products_categories/beer-flavour-standards/</a>




