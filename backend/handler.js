"use strict";
import fetch from "node-fetch";
import axios from "axios";

const url = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

const config = {
	headers: {
		Authorization: "Bearer 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"
	}
}
async function query(data) {

	let result;
	try {
		result = await axios.post(url, data, config);
	} catch (e) {
		console.log("Failed to make call", e);
		return null;
	}

	console.log(result.data);
	return result.data;
}



export const hello = async (event) => {
	console.log("LK-ENTRYPoint", event.body);
	console.log("PARSED QUERY", JSON.parse(event.body));

	const queryStr = {inputs: JSON.parse(event.body).query};
	const result = await query(queryStr)

	console.log("LK-HARDWORK-DONE");
	return {
		statusCode: 200,
		body: JSON.stringify(result),
	};
};

export const thing = async (event) => {
	console.log("Thing started");
	return {
		statusCode: 200,
		body: JSON.stringify("Thing is responding... neat!"),
	};
}
