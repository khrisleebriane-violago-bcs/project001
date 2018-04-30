
module.exports = {
    url: 'https://www.google.com.ph',
    elements: {
        gmailMenuItem: {
            selector: '#gbw > div > div > div.gb_oe.gb_R.gb_Mg.gb_Cg > div:nth-child(2) > a'
        },
        searchTextBox: {
            selector: 'input[name=q]'
        },
        searchButton: {
            selector: 'input[type=submit]'
        }
    }
}