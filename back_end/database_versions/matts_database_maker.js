const thingsToAdd = [
    {
        game_name : 'Monopoly',
        general_details : 'experienced players preferred, college students preferred, parking available, food provided',
        street_address : '5500 Irvine Center Dr.',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.675824',
        lon : '-117.778006',
        date : '2017-10-28',
        time : '17:00:00'
    },
    {
        game_name : 'Scrabble',
        general_details : 'BYOB, no food provided, 21 years old and up, parking unavailable',
        street_address : '50 Eastshore',
        city : 'Irvine',
        state : 'CA',
        zip : '92604',
        lat : '33.675216',
        lon : '-117.784979',
        date : '2017-11-13',
        time : '18:30:00'
    },
    {
        game_name : 'Cards Against Humanity',
        general_details : 'BBQ before party, BYOB, parking available, pets present, adults only, no previous experience necessary',
        street_address : '2005 Los Trancos Dr.',
        city : 'Irvine',
        state : 'CA',
        zip : '92617',
        lat : '33.641954',
        lon : '-117.840736',
        date : '2017-12-01',
        time : '17:00:00'
    },
    {
        game_name : 'Scrabble, Apples to Apples, Pictionary',
        general_details : 'Private event, Staff and RSVP only, food provided, no alcohol, guest and staff parking, all age groups, any level of experience',
        street_address : 'Irvine Research Center',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.642333',
        lon : '-117.739639',
        date : '2017-11-15',
        time : '18:30:00'
    },
    {
        game_name : 'Charades',
        general_details : 'Staff and family members only, food provided, wine provided, guest parking',
        street_address : 'Irvine Medical and Science Complex',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.658195',
        lon : '-117.767148',
        date : '2017-12-12',
        time : '19:00:00'
    },
    {
        game_name : 'Yahtzee',
        general_details : 'No food or drinks, water ok, all age groups, previous experience preferred',
        street_address : '101 Technology Dr.',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.6505632',
        lon : '-117.7461516',
        date : '2017-10-10',
        time : '12:00:00'
    },
    {
        game_name : 'Clue',
        general_details : 'No alcohol, all age groups, parking available, pets in the house, no previous experience required',
        street_address : '1 Holland',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.646562',
        lon : '-117.7265231',
        date : '2017-09-22',
        time : '15:00:00'
    },
    {
        game_name : 'Ouija',
        general_details : 'Will have alcohol, BYOB, no food, pets in the house, no parking available',
        street_address : 'Snow Heaven, 22367 El Toro Rd.',
        city : 'Lake Forest',
        state : 'CA',
        zip : '92630',
        lat : '33.638777',
        lon : '-117.680747',
        date : '2017-11-15',
        time : '20:30:00'
    },
    {
        game_name : 'Monopoly',
        general_details : 'BBQ before the game, all age groups, BYOB, parking available, carpool available, no previous experience required',
        street_address : 'Pizza 900, 23020 Lake Forest Dr. #170',
        city : 'Laguna Hills',
        state : 'CA',
        zip : '92653',
        lat : '33.628360',
        lon : '-117.725223',
        date : '2017-10-07',
        time : '17:00:00'
    },
    {
        game_name : 'The Game of Life',
        general_details : 'some alcohol provided, BYOB, no food provided, no parking, carpool available, 21 years and older only',
        street_address : '9461 Irvine Center Dr.',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.635140',
        lon : '-117.735505',
        date : '2017-09-29',
        time : '19:00:00'
    },
    {
        game_name : 'Sorry!',
        general_details : 'Kids game, BBQ for parents, parking available, no experience required',
        street_address : '511 Spectrum Center Dr.',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.651447',
        lon : '-117.745689',
        date : '2017-07-02',
        time : '10:00:00'
    },
    {
        game_name : 'Battleship',
        general_details : 'two dogs in the house, all age groups, food provided, no parking',
        street_address : '115 Technology Dr.',
        city : 'Irvine',
        state : 'CA',
        zip : '92618',
        lat : '33.660166',
        lon : '-117.744691',
        date : '2017-10-04',
        time : '16:00:00'
    },
    {
        game_name : 'Catan',
        general_details : 'no alcohol, bring your own food, parking available, no previous game exprience necessary, all age groups',
        street_address : '125 Retreat',
        city : 'Irvine',
        state : 'CA',
        zip : '92603',
        lat : '33.643051',
        lon : '-117.770051',
        date : '2017-09-27',
        time : '18:00:00'
    }
];


for (let i = 0; i < thingsToAdd.length; i++) {
    $.ajax({
        method: 'post',
        dataType: 'json',
        url: "./event_input_decision_maker.php?action=newEvent",
        data: thingsToAdd[i],
        timeout: 5000,
        success: function (objectFromServer) {
            console.log(objectFromServer);
        },
        error: function (xhr, textStatus, errorString) {
            console.log(errorString);
        }
    });
}