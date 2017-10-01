const chars = {
	'<': '&lt;',
	'>': '&gt;'
};

const filterXss = str => str.replace(/[<>]/g, char => chars[char]);

module.exports = { filterXss };
