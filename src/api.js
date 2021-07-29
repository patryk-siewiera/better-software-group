const BASE_URL = "https://thebetter.bsgroup.eu/";

export function getLoginTokenAnonymous() {
	return fetch(BASE_URL + "Authorization/SignIn", {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
		},
		body: "{}",
	})
		.then((response) => {
			// jwt = AuthorizationToken.Token
			return response
				.json()
				.then((res) => res["AuthorizationToken"]["Token"]);
		})
		.catch((err) => {
			console.error(err);
		});
	// example response

	// {
	//   "User": {
	//     "Id": -999,
	//     "UserName": "Anonymous",
	//     "FullName": "Anonymous user",
	//     "ClientRoles": []
	//   },
	//   "AuthorizationToken": {
	//     "Token": "eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwidHlwIjoiSldUIn0.o_NS43Q1a6UuHCzBld7MF6YEUU8eb4xOQk4MLJmTkhwl77fnobu8_A.V5wJDbC9jGxY98507fUBvg.ydTXQUvLLjHp5hWqEY1pSXF5phimPOihxwzvaPE2UI4mph2PuOpD6qdBFOQfLCpHoq-QfZgA-6ER7X-JMAcCFSpidGSldl1azCJg3LCaisGi6XvGKhn83Wnhj58BqXuXHviRcC8tIy7Y95QgWHSBflVLevX-0OjYVcT-u4HLevhRiHLxNK2rHkZux_54-meODPvN14KVjH5LzXwxAAS5F8IInN5RRmUnTjoCXJNKkKGUhdoJ0YJgQ8GEyzQ29KGgd0LRbSc9yUrJH0SMzPdyaobi3GfjulSRNc6K2MfbSdIJHf-mRiGcA_ilIO_NObKjWJ2XMXyl-KQ6_XlPSXjcryNySaLurjBi1I2w1BfBL0VInhtBbJylYeQi9t6sfPSe_HX0-vKajseJw4fgInTmS7LFwo4i9_yUnBDfnEJdchTqzSSe5z-hx2A4RuOXot7OCotAoVlW3XbgK0KR8-ncC4pmPaPEjoooEyJc-wxaVvlvLnEAG7I_LFWEX2feRvo3Wwp4mDZ4uXPpN6AFFaK8gEVYrnO2MnN6uFfPV3LS6G00ouE3WmytXdwuHQq4jxTKy6EL6PaB3Tg0ryBwl55enQ.Vv7XTI2-kSGTLFmWJkVyhw",
	//     "TokenExpires": "2021-07-28T06:28:49.2774479+00:00"
	//   }
	// }
}

export function getMediaList(data, token) {
	// {"MediaListId": 2,
	// "IncludeCategories": false,
	// "IncludeImages": true,
	// "IncludeMedia": false,
	// "PageNumber": 1,
	// "PageSize": 15}
	return fetch(BASE_URL + "Media/GetMediaList", {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json().then((response) => {
				console.log("POST Media/GetMediaList response:");
				console.log(response);
				return response;
			});
		})
		.catch((err) => {
			console.error(err);
		});
}

export function getPlayer(id, jwtToken) {
	// {"MediaId": 15,
	// "StreamType": "TRIAL"}
	let data = { MediaId: id, StreamType: "TRIAL" };

	// body :  {}
	return fetch(BASE_URL + "Media/GetMediaPlayInfo", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + jwtToken,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			return response.json().then((response) => {
				console.log(response);
				return response;
			});
		})
		.catch((err) => {
			console.error(err);
		});
	// example response

	//   "MediaId": 15,
	//   "Title": "Top Gun \nMAVERICK",
	//   "Description": "After more than thirty years of service as one of the Navy's top aviators, Pete Mitchell is where he belongs, pushing \nthe envelope as a courageous test pilot and dodging\nthe advancement in rank that would ground him.",
	//   "MediaTypeCode": "VOD",
	//   "MediaTypeDisplayName": "VOD",
	//   "StreamId": 75,
	//   "Provider": "Internal",
	//   "ContentUrl": "https://cd-stream-od.telenorcdn.net/tnfbaod/SF/585db4b3e4b09db0cf348a64/dash_a1.ism/playlist.mpd"
}
