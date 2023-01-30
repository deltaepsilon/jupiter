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

