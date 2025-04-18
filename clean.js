
function cleanData(data) {
    return data.replace(/[\n\r]+/g, ' ')  
               .replace(/\s+/g, ' ')   
               .trim()
               .replace(/•/g, '-')
               .replace(/[“”‘’]/g, '"') 
               .replace(/[^a-zA-Z0-9\s,.-]/g, '');
}

module.exports = {cleanData};
