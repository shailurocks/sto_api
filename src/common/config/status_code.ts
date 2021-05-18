export const status_code = {
    success : {
        code: 200,
		status: "success",
		status_text: "success",
    },
	invalid_input: {
		code: 422,
		status: "error",
		status_text: "Invalid Input Params",
	},
	invalid_query: {
		code: 500,
		status: "error",
		status_text: "Executed query is invalid",
	},
	no_results: {
		code: 200,
		status: "success",
		status_text: "No Results Found",
	},
	fatal_error: {
		code: 500,
		status: "error",
		status_text: "Something went wrong in execution.",
	},
	not_found: {
		code: 404,
		status: "not_found",
		status_text: "Page not found",
	},
	bad_request: {
		code: 400,
		status: "bad_request",
		status_text: "Bad Request",
	},
	unauthorized: {
		code: 401,
		status: "unauthorized",
		status_text: "unauthorized request",
	},
}