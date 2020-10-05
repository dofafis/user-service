export const VALID_USER = {
    name: 'João Benchimol',
    cpf: '64283045039',
    gender: 'Masculino',
    email: 'oliveirafarias.lucas@gmail.com',
    birthDate: new Date(),
    address: {
      cep: '69088500',
      neighborhood: 'Jorge Teixeira',
      street: 'Rua das Mangueiras',
      number: 944,
      complement: 'Perto de muitas coisas que você conhece',
      city: 'Manaus',
      state: 'AM'
    },
    phone: {
      ddd: '92',
      phoneNumber: '988550885'
    }
  }

export const VALID_USER_DUPLICATED_CPF = {
  name: 'João Benchimol',
  cpf: '64283045039',
  gender: 'Masculino',
  email: 'oliveirafarias.lucas@gmail.com',
  birthDate: new Date(),
  address: {
    cep: '69088500',
    neighborhood: 'Jorge Teixeira',
    street: 'Rua das Mangueiras',
    number: 944,
    complement: 'Perto de muitas coisas que você conhece',
    city: 'Manaus',
    state: 'AM'
  },
  phone: {
    ddd: '92',
    phoneNumber: '988550885'
  }
}

export const VALID_USER_DUPLICATED_EMAIL = {
  name: 'João Benchimol',
  cpf: '64283045038',
  gender: 'Masculino',
  email: 'oliveirafarias.lucas@gmail.com',
  birthDate: new Date(),
  address: {
    cep: '69088500',
    neighborhood: 'Jorge Teixeira',
    street: 'Rua das Mangueiras',
    number: 944,
    complement: 'Perto de muitas coisas que você conhece',
    city: 'Manaus',
    state: 'AM'
  },
  phone: {
    ddd: '92',
    phoneNumber: '988550885'
  }
}

export const INVALID_USER_ADDRESS = {
  name: 'João Benchimol',
  cpf: '64283045039',
  gender: 'Masculino',
  email: 'oliveirafarias.lucas@gmail.com',
  birthDate: new Date(),
  address: {
    cep: '69088500',
    neighborhood: 'Jorge Teixeira',
    number: 944,
    complement: 'Perto de muitas coisas que você conhece',
    city: 'Manaus',
    state: 'AM'
  },
  phone: {
    ddd: '92',
    phoneNumber: '988550885'
  }
}

export const INVALID_USER_PHONE = {
  name: 'João Benchimol',
  cpf: '64283045039',
  gender: 'Masculino',
  email: 'oliveirafarias.lucas@gmail.com',
  birthDate: new Date(),
  address: {
    cep: '69088500',
    neighborhood: 'Jorge Teixeira',
    street: 'Rua das Mangueiras',
    number: 944,
    complement: 'Perto de muitas coisas que você conhece',
    city: 'Manaus',
    state: 'AM'
  },
  phone: {
    phoneNumber: '988550885'
  }
}