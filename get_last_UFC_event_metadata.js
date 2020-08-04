// Global Variable(s)
const event_metadata = require('./event_metadata_source_file'); // Metadata JSON Variable

// Dependencies
const axios = require('axios'); // Sending Async HTTP Requests
const cheerio = require('cheerio'); // Web Scraping
const UFC_scrape_tool = require('./event_scraping_tools.js'); // Custom UFC Web Scraping Tools Library

// Async HTTP Request Method
async function sendHTTPRequest(url){
    try {
        const response = await axios.get(url); //use axios to send http request // Async

        return response.data;
    }
    catch (err) {
        console.log(err);
        return;
    }
}

// Get URLs for the ALL UFC events
async function completed_event_metadata_url(ufc_stats_metadata_url){
    try {
        // Send HTTP Request to URL and load into Cheerio 
        const ufc_stats_frontpage_html_data = await sendHTTPRequest(ufc_stats_metadata_url); // Send Async HTTP request to UFC Stats front page
        const $ = cheerio.load(ufc_stats_frontpage_html_data); // Load UFC stats homepage into cheerio

        var event_metadata_urls = [];
        var buf = $('body > section > div > div > div > div.b-statistics__sub-inner > div > table > tbody > tr').length;
        for(var i=3; i<buf+2; i++){
            event_metadata_urls[i-3] = $('body > section > div > div > div > div.b-statistics__sub-inner > div > table > tbody > tr:nth-child('+ i +') > td:nth-child(1) > i > a').attr("href"); // 'tr:nth-child(x)' is the event selector, to change events modify 'x'. 3 is the most recent/default value
        }

        return event_metadata_urls;
    }
    catch (err) {
        console.log(err);
        return;
    }
}

// Get all revelvant data from the UFC Stats webpage about the event
async function get_event_fight_data(latest_ufc_event_url, event_metadata, UFC_scrape_tool){
    try {
        // Send HTTP Request to URL and load into Cheerio 
        const latest_ufc_event_frontpage = await sendHTTPRequest(latest_ufc_event_url); // Send Async HTTP request to UFC Stats event front page
        const $_1 = cheerio.load(latest_ufc_event_frontpage); // Load UFC Stats event front page in cheerio

        // Title of event
        await UFC_scrape_tool.event_title(i, $_1, event_metadata);

        // Number of fights in the event
        await UFC_scrape_tool.number_of_fights(i, $_1, event_metadata);

        // When the event was held
        await UFC_scrape_tool.event_date(i, $_1, event_metadata);

        // Where the event was held
        await UFC_scrape_tool.event_location(i, $_1, event_metadata);

        // How many fans were in attenance
        await UFC_scrape_tool.event_attendance(i, $_1, event_metadata);

        for(var i=1; i<event_metadata.number_of_fights+1; i++){

            // Fight metadata URL
            await UFC_scrape_tool.detailed_stats_url(i, $_1, event_metadata);
            // Winner Career Stats
            // await UFC_scrape_tool.winners_metadata_url(i, $_1, event_metadata);
            // // Looser Career Stats
            // await UFC_scrape_tool.loosers_metadata_url(i, $_1, event_metadata);
        }

        for(var i=1; i<event_metadata.number_of_fights+1; i++){
            
            // Send HTTP Request to URL and load into Cheerio
            const detailed_stats_html = await sendHTTPRequest(event_metadata.detailed_stats_url[i-1]); // Send Async HTTP request to UFC event detailed stats webpage
            const $_2 = cheerio.load(detailed_stats_html); // Load UFC event detailed stats webpage in cheerio

            // Winners name
            await UFC_scrape_tool.winner_name(i, $_2, event_metadata);

            // Loosers name
            await UFC_scrape_tool.looser_name(i, $_2, event_metadata);

            // What weight class the fight was at
            await UFC_scrape_tool.weight_class(i, $_2, event_metadata);

            // How the fight ended
            await UFC_scrape_tool.fight_method(i, $_2, event_metadata);

            // What round the fight ended
            await UFC_scrape_tool.round_end(i, $_2, event_metadata);

            // Exact time the fight ended
            await UFC_scrape_tool.time_end(i, $_2, event_metadata); 

            // How many rounds and how many minutes
            await UFC_scrape_tool.time_format(i, $_2, event_metadata);

            // Who was the referee
            await UFC_scrape_tool.referee(i, $_2, event_metadata);
            
            // How the fight was finished
            await UFC_scrape_tool.finish_details(i, $_2, event_metadata);

            // Get Event Fight Bonuses
            await UFC_scrape_tool.get_fight_bonuses(i, $_2, event_metadata);

            // Get Winner Round By Round Stats
            await UFC_scrape_tool.get_winner_overall(i, $_2, event_metadata); // Overall 
            await UFC_scrape_tool.get_winner_round_1(i, $_2, event_metadata); // Round 1
            await UFC_scrape_tool.get_winner_round_2(i, $_2, event_metadata); // Round 2 
            await UFC_scrape_tool.get_winner_round_3(i, $_2, event_metadata); // Round 3 
            await UFC_scrape_tool.get_winner_round_4(i, $_2, event_metadata); // Round 4 
            await UFC_scrape_tool.get_winner_round_5(i, $_2, event_metadata); // Round 5 

            // Get Looser Round By Round Stats
            await UFC_scrape_tool.get_looser_overall(i, $_2, event_metadata); // Overall 
            await UFC_scrape_tool.get_looser_round_1(i, $_2, event_metadata); // Round 1
            await UFC_scrape_tool.get_looser_round_2(i, $_2, event_metadata); // Round 2 
            await UFC_scrape_tool.get_looser_round_3(i, $_2, event_metadata); // Round 3 
            await UFC_scrape_tool.get_looser_round_4(i, $_2, event_metadata); // Round 4 
            await UFC_scrape_tool.get_looser_round_5(i, $_2, event_metadata); // Round 5 

            // Get Significant Strikes Stats
            await UFC_scrape_tool.significant_strikes_landed_area(i, $_2, event_metadata);
        }

        return;
    }
    catch (err) {
        console.log(err);
        return;
    }
}

// Main loop  // Asynchronous
const mainLoop = async (event_metadata, UFC_scrape_tool) => {

    // Goto UFC Stats frontpage
    const ufc_event_url = await completed_event_metadata_url("http://www.ufcstats.com/statistics/events/completed?page=all"); // Get the last URL for the last completed UFC event

    // Get data from the most recent UFC event
    await get_event_fight_data(ufc_event_url[0], event_metadata, UFC_scrape_tool); // Get the last URL for the last completed UFC event
    console.log(event_metadata);

    return;  
};

mainLoop(event_metadata, UFC_scrape_tool);