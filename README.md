## Usage

1. npm install

2. npm start

## Api Documentation

** **Not implemented** **


**Checking and Unchecking of tasks:**

PATCH /tasks/:id

**Request Payload:**

Checking tasks: 
	{
		completedAt: timestamp
	}

Unchecking tasks:
	{
		completedAt: null
	}

**Response Payload:**

Success: 2xx

Error: 4xx, 5xx

## Notes

We do not actually need any data back from the database, but would require a success or
failure status code. We can have a success callback to use the data we originally passed
up to the API Call, and update our state to update our UI. We can have a failure callback
to display an error message on the UI of a failure to update the database and log the 
error in the server. Another option would be to simply not do anything on failure, as
constantly having error messages pop up can get annoying, and having the app simply
not display any changes is sufficient for the user to retry the checking/unchecking.

One thing to note, given the current implementation is that since the data is stored in
an array, if we want to update the array in state with the modified createdAt values, we would have
to linearly iterate through the whole array, which is not a big deal for small data sets,
but can be an issue if you had a large set of tasks. You could instead opt to store these
as an Object (hash table) which would provide you constant time look up and updates in the
app such as given in this example.

{

	1: 	{

				id: 1,

				group: "Purchases",

				task: "Go to the bank",

    		dependencyIds: [],

				completedAt: null,

			},

	2: 	{

    		id: 2,

    		group: "Purchases",

    		task: "Buy hammer",

    		dependencyIds: [1],

    		completedAt: null,

  		},

}
