## Feb 1, 2023

I've got the downloads/ingested/files data chart working, and it cleared up all of my confusion as I had hoped.

I'm feeling a lot better about the stability of the product now. The data chart makes discrepancies easy to identify and remedy. I immediately found some bugs, fixed them and... I win?? It's working so much better now. Everything is going more smoothly, more inline with expectations.

Individual file progress was a little tough to track, so I've added a progress event and now I just need to find a way to display progress succinctly.

I get so discourage with this project, assuming that I'll either never get it stable, or nobody will ever want to buy it. But it is getting stable, and people are continuing to post to Reddit about needing a solution... so the bigger risk is how much I can charge for it.

I'm still terrified that nobody will pay more than $30 for the thing. That could be ok... but I'd have to sell a metric ton, and I'd have to keep selling forever and ever. This really should be SaaS, because I'm going to have to maintain it forever, and I'd like to keep adding features and building it out. But is one more subscription going to piss off potential customers???

## Jan 30, 2023

I was low-energy this morning. I could barely get out of bed, and I didn't want to code on this project.

I managed to get moving eventually... like around 6:30am... and I did clean some stuff up. I'm still seeing odd results for indexed/downloaded/mediaItem counts. I decided to build a whole drawer system just to inspect those numbers. I need to understand why they're so unpredictable.

## Jan 28, 2023

So... my multiplexing function didn't resolve its promise correctly. It resolved early, which caused a bunch of issues.

I spent an hour or two debugging the counts and adding a better count tracking system for the indexed filepaths. I'm still a tad wary of my counts, but they appear to be in order for now???

It's ok. This is a complex bit of software, so everything about it is bound to be complex and bug-prone. I have to be very patient and NOT QUIT. I am scared to start working on this every morning. I have to force myself to take the first few baby steps into the project and once I've regained context I can build momentum.

This project is challenging in so many ways. I'm terrified of marketing it.

##  Jan 27, 2023

Indexing is multiplexed.

Download counts are not accurate and a moved `.HEIC` file is causing a bug.

![Jan 27](./images/2023-01-27-bugs.png)

