## March 3, 2023

Melissa has been out of town, leaving me with the kids. It hasn't given me as much time for Photos work.

I've also been a bit more engaged with BoomPop this week, so that's good... except for Photos progress.

I'm through the bulk of the bugs. I just crushed a nasty one today. I'm currently downloading my entire library from scratch to see if it hangs. I need it to go smoothly for customers. I need to recover from any reasonably common errors that the user might face.

In unrelated news, I got a small ($9k) raise at work and a large ($20k) tax refund from my accountant. The money hasn't hit my bank yet, but I can't wait to transfer that $20k to Robinhood and start earning that sweet 4.1% interest. We're hoping to buy property in the next few years, so stacking cash is paramount. Yesterday was a good day!

I've got to keep cranking on Photos and not give up. It's tempting. I always want to give up just before I launch. It's all of the non-coding stuff that scares me. It's totally subconscious. I'd never think "wow, I'm scared, I'd better not do this". I just feel an underlying lack of enthusiasm, because I'm about to embark on something risky that I don't understand and don't necessarily want to understand?? I know it's a bad instinct. I'm fighting it.

## Feb 24, 2023

I've send the link to the five people on Reddit who expressed interest in alpha testing.

It was kinda hard to do.

I'm at the fear stage of the project. I hate this part. I have this sick feeling that I've wasted my time and everything sucks. I'm not proud of it yet.

Ok... my first alpha tester responded and dove right in. The dude went for it. He found bugs. I'm furiously fixing them and chatting with him on Reddit. He's a lifesaver. 

The fixes took about an hour, but I think they're going to hold 🤞

He asked if I could see his photos. I guess I can. Not cool, but encrypting his data would be... extraordinarily painful. I need to look into it. There may be an encryption-at-rest solution for firebase.

## Feb 17, 2023

I spent all yesterday fighting with GitHub Actions and Docker to establish a continuous deployment pipeline.

I don't strictly need CD, but it's so nice to fall back on if I need to make quick edits in the future. I can do them from anywhere, directly to GitHub, and it'll just push to prod.

Now I've got to actually ship the thing. Every step of the way seems like slogging through thick sand... but I've gotta get this shipped.

## Feb 10, 2023

The progress file-tree FINALLY looks passable.

It's a real challenge to fit so much dense data into a single pane and keep it legible, but with some inspiration from https://berkeleygraphics.com/, I pulled something off.

Now I'm stuck chasing bugs around. The goal is to download full libraries without any unhandled errors. I'm closing in on it... but there are so many ways that a file can be broken. Fortunately, my library is pretty diverse. Once I get Melissa's library downloaded too, we'll likely have seen all of the ugliness that can exist in a Google Photos library.

I can't quit. I keep having these nasty thoughts about quitting, but I have to ignore them and soldier on.

I haven't shipped any personal projects in three years. COVID took the wind right out of my sails.

I'm proving that I can still ship. I will not give up. I will get this all the way out into customers' hands.

## Feb 8, 2023

My filesystem db was running slowly. Like really slowly. It was reading/writing to the filesystem for every data change.

I spent yesterday diagnosing the problem and coming up with a quick solution. I'm holding the data in an in-memory cache with a 30s ttl. I'm writing to the filesystem every 2s.

I cleaned up the solution a bit this morning... and it worked. It almost worked the first try.

My DB access sped up by at least a factor of 10. It's kinda nuts how fast it's going now. I'm running into new bugs due to the speed!

Now that I'm ingesting tons of data, I need to spend some time scaling up my UX. I can consistently download my small test library in seconds. Now I need to get a clean download of my full library. It's a much higher bar.

## Feb 6, 2023

I'm having a tough time getting started in the morning. My faith is waning, even as the bugs are disappearing and the code is running great.

I guess I keep going???

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

