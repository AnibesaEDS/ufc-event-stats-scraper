module.exports = {

    event_title: async (i, $_1, event_metadata) => {
        try {
            var scraped_data_buf = $_1('body > section > div > h2').text().replace(/\s/g, "").split(':');

            event_metadata.event_title.event_type = scraped_data_buf[0].split(/(\d+)/).join(' ').slice(0, -1);
            event_metadata.event_title.headliner_1 = scraped_data_buf[1].split('.')[0].replace('vs', '');
            event_metadata.event_title.headliner_2 = scraped_data_buf[1].split('.')[1].split(/(\d+)/).join(' ');

            return event_metadata.event_title; 
        } catch (error) {
            console.log(error);
        }
    },  

    number_of_fights: async (i, $_1, event_metadata) => {
        try {
            return event_metadata.number_of_fights = $_1('body > section > div > div > table > tbody > tr').length; 
        } catch (error) {
            console.log(error);
        }
    },    

    event_date: async (i, $_1, event_metadata) => {
        try {
            var scraped_data_buf = $_1('body > section > div > div > div.b-list__info-box.b-list__info-box_style_large-width > ul > li:nth-child(1)').text().replace(/\s/g, "").split(":").pop().split(/(\d+)/);

            event_metadata.event_date.month = scraped_data_buf[0];
            event_metadata.event_date.day = scraped_data_buf[1];
            event_metadata.event_date.year = scraped_data_buf[3];

            return event_metadata.event_date; 
        } catch (error) {
            console.log(error);
        }
    },    

    event_location: async (i, $_1, event_metadata) => {
        try {
            var scraped_data_buf = $_1('body > section > div > div > div.b-list__info-box.b-list__info-box_style_large-width > ul > li:nth-child(2)').text().replace(/\s/g, "").split(":").pop().split(',');

            event_metadata.event_location.country = scraped_data_buf[2].split(/(?=[A-Z])/).join(' ');
            event_metadata.event_location.province = scraped_data_buf[1].split(/(?=[A-Z])/).join(' ');
            event_metadata.event_location.city = scraped_data_buf[0].split(/(?=[A-Z])/).join(' ');

            return event_metadata.event_location; 
        } catch (error) {
            console.log(error);
        }
    },    

    event_attendance: async (i, $_1, event_metadata) => {
        try {
            return event_metadata.event_attendance = $_1('body > section > div > div > div.b-list__info-box.b-list__info-box_style_large-width > ul > li:nth-child(3)').text().replace(/\s/g, "").split(":").pop();
        } catch (error) {
            console.log(error);
        }
    },

    detailed_stats_url: async (i, $_1, event_metadata) => {
        try {
            return event_metadata.detailed_stats_url[i-1] = $_1('body > section > div > div > table > tbody > tr:nth-child('+i+') > td.b-fight-details__table-col.b-fight-details__table-col_style_align-top > p > a').attr("href"); 
        } catch (error) {
            console.log(error);
        }
    },

    winners_metadata_url: async (i, $_1, event_metadata) => {
        try {
            return event_metadata.winners_metadata_url[i-1] = $_1('body > section > div > div > table > tbody > tr:nth-child('+i+') > td:nth-child(2) > p:nth-child(1) > a').attr("href"); 
        } catch (error) {
            console.log(error);
        }
    },

    loosers_metadata_url: async (i, $_1, event_metadata) => {
        try {
            return event_metadata.loosers_metadata_url[i-1] = $_1('body > section > div > div > table > tbody > tr:nth-child('+i+') > td:nth-child(2) > p:nth-child(2) > a').attr("href");
        } catch (error) {
            console.log(error);
        }
    },

    winner_name: async (i, $_2, event_metadata) => {
        try {
            var scraped_data_buf = $_2('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(1) > div').text().replace(/\s/g, "").replace(/"/g, ' ').split(' ');

            if(scraped_data_buf.length == 3){
                scraped_data_buf = scraped_data_buf.slice(0,-1);

                event_metadata.winner_name[i-1] = ({
                    first_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[0],
                    last_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[1],
                    nick_name : scraped_data_buf[1].split(/(?=[A-Z])/)
                })
            }
            else{
                event_metadata.winner_name[i-1] = ({
                    first_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[0],
                    last_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[1],
                    nick_name : null
                })
            }

            return event_metadata.winner_name[i];
        } catch (error) {
            console.log(error);
        }
    },

    looser_name: async (i, $_2, event_metadata) => {
        try {
            var scraped_data_buf = $_2('body > section > div > div > div.b-fight-details__persons.clearfix > div:nth-child(2) > div').text().replace(/\s/g, "").replace(/"/g, ' ').split(' ');

            if(scraped_data_buf.length == 3){
                scraped_data_buf = scraped_data_buf.slice(0,-1);

                event_metadata.looser_name[i-1] = ({
                    first_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[0],
                    last_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[1],
                    nick_name : scraped_data_buf[1].split(/(?=[A-Z])/)
                })
            }
            else{
                event_metadata.looser_name[i-1] = ({
                    first_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[0],
                    last_name : (scraped_data_buf[0].split(/(?=[A-Z])/))[1],
                    nick_name : null
                })
            }

            return event_metadata.looser_name[i];
        } catch (error) {
            console.log(error);
        }
    },

    weight_class: async (i, $_2, event_metadata) => {
        try {
            var scraped_data_buf =  $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i').text().replace(/\s/g, "").split(/(?=[A-Z])/).slice(0,-1)

            if(scraped_data_buf.length == 5){
                event_metadata.weight_class[i-1] = scraped_data_buf[0] + scraped_data_buf[1] + scraped_data_buf[2] + ' ' + scraped_data_buf[3] + ' ' + scraped_data_buf[4];

            }
            else{
                event_metadata.weight_class[i-1] = scraped_data_buf.join(' ');
            }

            return event_metadata.weight_class[i-1];
        } catch (error) {
            console.log(error);
        }
    },

    fight_method: async (i, $_2, event_metadata) => {
        try {
            return event_metadata.fight_method[i-1] = $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i:nth-child(1)').text().replace(/\s/g, "").split(":").pop();
        } catch (error) {
            console.log(error);
        }
    },

    round_end: async (i, $_2, event_metadata) => {
        try {
            return event_metadata.round_end[i-1] = $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i:nth-child(2)').text().replace(/\s/g, "").split(":").pop();
        } catch (error) {
            console.log(error);
        }
    },

    time_end: async (i, $_2, event_metadata) => {
        try {
            return event_metadata.time_end[i-1] = $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i:nth-child(3)').text().replace(/\s/g, "").split(":").slice(-2).join(':');
        } catch (error) {
            console.log(error);
        }
    },

    time_format: async (i, $_2, event_metadata) => {
        try {
            var regExp = /\(([^)]+)\)/;

            return event_metadata.time_format[i-1] = regExp.exec($_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i:nth-child(4)').text().replace(/\s/g, "").split(":").pop())[1];
        } catch (error) {
            console.log(error);
        }
    },
    
    referee: async (i, $_2, event_metadata) => {
        try {
            return event_metadata.referee[i-1] = $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(1) > i:nth-child(5)').text().replace(/\s/g, "").split(":").pop().split(/(?=[A-Z])/).join(' ');
        } catch (error) {
            console.log(error);
        }
    },

    finish_details: async (i, $, event_metadata) => {
        try {
            var scraped_data_buf = $('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__content > p:nth-child(2)').text().replace(/\s/g, "").split(":").pop().split('.'); 

            if(scraped_data_buf.length == 4){
                scraped_data_buf = scraped_data_buf.slice(0,-1);

                event_metadata.finish_details.judge_1[i-1] = ({
                    first_name : scraped_data_buf[0].split(/(\d+)/)[0].split(/(?=[A-Z])/)[0],
                    last_name : scraped_data_buf[0].split(/(\d+)/)[0].split(/(?=[A-Z])/)[1],
                    score : scraped_data_buf[0].split(/(\d+)/)[1] + '-' + scraped_data_buf[0].split(/(\d+)/)[3],
                })

                event_metadata.finish_details.judge_2[i-1] = ({
                    first_name : scraped_data_buf[1].split(/(\d+)/)[0].split(/(?=[A-Z])/)[0],
                    last_name : scraped_data_buf[1].split(/(\d+)/)[0].split(/(?=[A-Z])/)[1],
                    score : scraped_data_buf[1].split(/(\d+)/)[1] + '-' + scraped_data_buf[0].split(/(\d+)/)[3],
                })

                event_metadata.finish_details.judge_3[i-1] = ({
                    first_name : scraped_data_buf[2].split(/(\d+)/)[0].split(/(?=[A-Z])/)[0],
                    last_name : scraped_data_buf[2].split(/(\d+)/)[0].split(/(?=[A-Z])/)[1],
                    score : scraped_data_buf[2].split(/(\d+)/)[1] + '-' + scraped_data_buf[0].split(/(\d+)/)[3],
                })  

                event_metadata.finish_details.method[i-1] = null;
            }
            else{    
                if(scraped_data_buf[0].split(/(?=[A-Z])/)[0] == 'Armbar'){
                    event_metadata.finish_details.method[i-1] = scraped_data_buf[0].split(/(?=[A-Z])/).join(' ');
                }
                else{
                    event_metadata.finish_details.method[i-1] = scraped_data_buf[0].split(/(?=[A-Z])/)[0].replace('to', ' to') + ' ' + scraped_data_buf[0].split(/(?=[A-Z])/)[1] + ' ' + scraped_data_buf[0].split(/(?=[A-Z])/)[2] + ' ' + scraped_data_buf[0].split(/(?=[A-Z])/)[3];
                }

                event_metadata.finish_details.judge_1[i-1] = ({
                    first_name : null ,
                    last_name : null,
                    score : null,
                })

                event_metadata.finish_details.judge_2[i-1] = ({
                    first_name : null ,
                    last_name : null,
                    score : null,
                })

                event_metadata.finish_details.judge_3[i-1] = ({
                    first_name : null ,
                    last_name : null,
                    score : null,
                })
            }

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_fight_bonuses: async (i, $_2, event_metadata) => {
        try {
            var scraped_data_buf = $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(1)').attr('src');

            if(scraped_data_buf != null){
                scraped_data_buf = scraped_data_buf.split("/").pop().replace('.png', '');
    
                if(scraped_data_buf == 'belt'){
                    var scraped_data_buf_1 = $_2('body > section > div > div > div.b-fight-details__fight > div.b-fight-details__fight-head > i > img:nth-child(2)').attr('src');
    
                    if(scraped_data_buf_1 != null){
                        scraped_data_buf_1 = scraped_data_buf_1.split("/").pop().replace('.png', '');
                        event_metadata.fight_bonus[i-1] = scraped_data_buf_1;
                    }
                }
    
                else{
                    event_metadata.fight_bonus[i-1] = scraped_data_buf;
                }
            }
    
            else{
                event_metadata.fight_bonus[i-1] = null;
            }

            if(event_metadata.fight_bonus[i-1] === undefined){
                event_metadata.fight_bonus[i-1] = null;
            }

            return;
        } catch (error) {
            console.log(error);
        }
    },

    significant_strikes_landed_area: async (i, $_2, event_metadata) => {
        try {
            event_metadata.significant_strikes_by_area.by_target.winner.head[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.b-fight-details__charts-table > div:nth-child(1) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_red.b-fight-details__charts-num_pos_left.js-red').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_target.winner.body[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.b-fight-details__charts-table > div:nth-child(2) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_dark-red.b-fight-details__charts-num_pos_left.js-red').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_target.winner.leg[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.b-fight-details__charts-table > div:nth-child(3) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_light-red.b-fight-details__charts-num_pos_left.js-red').text().replace(/\s/g, "");

            event_metadata.significant_strikes_by_area.by_position.winner.distance[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(2) > div > div.b-fight-details__charts-table > div:nth-child(1) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_red.b-fight-details__charts-num_pos_left.js-red').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_position.winner.clinch[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(2) > div > div.b-fight-details__charts-table > div:nth-child(2) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_dark-red.b-fight-details__charts-num_pos_left.js-red').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_position.winner.ground[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(2) > div > div.b-fight-details__charts-table > div:nth-child(3) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_light-red.b-fight-details__charts-num_pos_left.js-red').text().replace(/\s/g, "");


            event_metadata.significant_strikes_by_area.by_target.looser.head[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.b-fight-details__charts-table > div:nth-child(1) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_blue.b-fight-details__charts-num_pos_right.js-blue').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_target.looser.body[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.b-fight-details__charts-table > div:nth-child(2) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_dark-blue.b-fight-details__charts-num_pos_right.js-blue').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_target.looser.leg[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(1) > div > div.b-fight-details__charts-table > div:nth-child(3) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_light-blue.b-fight-details__charts-num_pos_right.js-blue').text().replace(/\s/g, "");

            event_metadata.significant_strikes_by_area.by_position.looser.distance[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(2) > div > div.b-fight-details__charts-table > div:nth-child(1) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_blue.b-fight-details__charts-num_pos_right.js-blue').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_position.looser.clinch[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(2) > div > div.b-fight-details__charts-table > div:nth-child(2) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_dark-blue.b-fight-details__charts-num_pos_right.js-blue').text().replace(/\s/g, "");
            event_metadata.significant_strikes_by_area.by_position.looser.ground[i-1] = $_2('body > section > div > div > section:nth-child(9) > div > div > div:nth-child(1) > div:nth-child(2) > div > div.b-fight-details__charts-table > div:nth-child(3) > i.b-fight-details__charts-num.b-fight-details__charts-num_style_light-blue.b-fight-details__charts-num_pos_right.js-blue').text().replace(/\s/g, "");

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_winner_overall: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.winner.overall[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(2) > p:nth-child(1)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(3) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(4) > p:nth-child(1)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(5) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(6) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(7) > p:nth-child(1)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(8) > p:nth-child(1)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(9) > p:nth-child(1)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(10) > p:nth-child(1)').text().replace(/\s/g, ""),
            })

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_winner_round_1: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.winner.round_1[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(2) > p:nth-child(1)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(3) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(4) > p:nth-child(1)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(5) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(6) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(7) > p:nth-child(1)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(8) > p:nth-child(1)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(9) > p:nth-child(1)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(10) > p:nth-child(1)').text().replace(/\s/g, ""),
            })

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_winner_round_2: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.winner.round_2[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(2) > p:nth-child(1)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(3) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(4) > p:nth-child(1)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(5) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(6) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(7) > p:nth-child(1)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(8) > p:nth-child(1)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(9) > p:nth-child(1)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(10) > p:nth-child(1)').text().replace(/\s/g, ""),
            })

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_winner_round_3: async (i, $_2, event_metadata) => {
        try {        
            event_metadata.totals.winner.round_3[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(2) > p:nth-child(1)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(3) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(4) > p:nth-child(1)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(5) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(6) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(7) > p:nth-child(1)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(8) > p:nth-child(1)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(9) > p:nth-child(1)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(10) > p:nth-child(1)').text().replace(/\s/g, ""),
            })

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_winner_round_4: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.winner.round_4[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(2) > p:nth-child(1)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(3) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(4) > p:nth-child(1)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(5) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(6) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(7) > p:nth-child(1)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(8) > p:nth-child(1)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(9) > p:nth-child(1)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(10) > p:nth-child(1)').text().replace(/\s/g, ""),
            })    

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_winner_round_5: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.winner.round_5[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(2) > p:nth-child(1)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(3) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(4) > p:nth-child(1)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(5) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(6) > p:nth-child(1)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(7) > p:nth-child(1)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(8) > p:nth-child(1)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(9) > p:nth-child(1)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(10) > p:nth-child(1)').text().replace(/\s/g, ""),
            })

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_looser_overall: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.looser.overall[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(2) > p:nth-child(2)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(3) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(4) > p:nth-child(2)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(5) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(6) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(7) > p:nth-child(2)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(8) > p:nth-child(2)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(9) > p:nth-child(2)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(4) > table > tbody > tr > td:nth-child(10) > p:nth-child(2)').text().replace(/\s/g, ""),
            })

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_looser_round_1: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.looser.round_1[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(2) > p:nth-child(2)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(3) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(4) > p:nth-child(2)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(5) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(6) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(7) > p:nth-child(2)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(8) > p:nth-child(2)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(9) > p:nth-child(2)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(4) > tr > td:nth-child(10) > p:nth-child(2)').text().replace(/\s/g, ""),
            })  

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_looser_round_2: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.looser.round_2[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(2) > p:nth-child(2)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(3) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(4) > p:nth-child(2)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(5) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(6) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(7) > p:nth-child(2)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(8) > p:nth-child(2)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(9) > p:nth-child(2)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(6) > tr > td:nth-child(10) > p:nth-child(2)').text().replace(/\s/g, ""),
            })  

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_looser_round_3: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.looser.round_3[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(2) > p:nth-child(2)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(3) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(4) > p:nth-child(2)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(5) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(6) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(7) > p:nth-child(2)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(8) > p:nth-child(2)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(9) > p:nth-child(2)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(8) > tr > td:nth-child(10) > p:nth-child(2)').text().replace(/\s/g, ""),
            })  

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_looser_round_4: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.looser.round_4[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(2) > p:nth-child(2)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(3) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(4) > p:nth-child(2)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(5) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(6) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(7) > p:nth-child(2)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(8) > p:nth-child(2)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(9) > p:nth-child(2)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(10) > tr > td:nth-child(10) > p:nth-child(2)').text().replace(/\s/g, ""),
            })  

            return;
        } catch (error) {
            console.log(error);
        }
    },

    get_looser_round_5: async (i, $_2, event_metadata) => {
        try {
            event_metadata.totals.looser.round_5[i-1] = ({
                KD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(2) > p:nth-child(2)').text().replace(/\s/g, ""),
                SIGSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(3) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                SIGSTRPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(4) > p:nth-child(2)').text().replace(/\s/g, ""),
                TOTALSTR : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(5) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TD : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(6) > p:nth-child(2)').text().replace(/\s/g, "").split('of'),
                TDPER : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(7) > p:nth-child(2)').text().replace(/\s/g, ""),
                SUBATT : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(8) > p:nth-child(2)').text().replace(/\s/g, ""),
                PASS : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(9) > p:nth-child(2)').text().replace(/\s/g, ""),
                REV : $_2('body > section > div > div > section:nth-child(5) > table > tbody:nth-child(12) > tr > td:nth-child(10) > p:nth-child(2)').text().replace(/\s/g, ""),
            })  

            return;
        } catch (error) {
            console.log(error);
        }
    },
    
}