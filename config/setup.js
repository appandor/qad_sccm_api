const setup = {
    minCheckInterval: 1 *60 *  1000,
    checks: [ 
        { days: [1,2,3,4,5,6,7],
          hhmm: '01:00'
        }
    ]
}

module.exports = setup