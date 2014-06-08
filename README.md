# Express Get Curator

The following task:

> Make API handle that - build a reusable module/middleware for GETting multiple resources in one go. Should be easy to inject into any existing express app / api.
>
> Example of final use:
> - GET api/multi ? users=api/users & customer=api/customers/23 & countries=api/countries ..
> returns {users: [..], customer: {..}, countries: [..] }


## Usage

    app.use(curator())

## Development

Run test by typing `npm test` or `grunt test` in the project root.
