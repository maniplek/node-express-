export const createUserValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errormessage: 
        "Must be at least 5 - 32 charac"
    },
    notEmpty: {
        errormessage: 'username cannot be empty'
    },
    isString: {
        errormessage: 'Username must be string'
    },
  },
  displayName: {
    notEmpty: true,
  }
}

export const getUserValidationsSchema = {
  filter: {
    isString: true,
    notEmpty: {
      errormessage: 'username cannot be empty'
    },
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errormessage: 
        "Must be at least 3 - 5 charac"
    },
  }
}
