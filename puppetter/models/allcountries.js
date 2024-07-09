const mongoose = require('mongoose');

const bgpInfoSchema = new mongoose.Schema({
    country_code: {
        type: String,
        required: true,
    },
    allocated_asn_count: {
        type: String,
        required: true,
    },
    allocated_ipv4_prefix_count: {
        type: String,
        required: true,
    },
    allocated_ipv6_prefix_count: {
        type: String,
        required: true,
    },
    allocated_ipv4_ip_count: {
        type: String,
        required: true
    }
});

const countries = mongoose.model('countries', bgpInfoSchema);

module.exports = countries;
