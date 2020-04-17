import validator from 'validator';
// import moment from 'moment';

export default async function validate(value, rules) {
  if (rules === undefined) {
    return {
      isValid: true,
      error: '',
    };
  }
  return new Promise((resolve, reject) => {
    const promises = rules.map((rule) => {
      return new Promise((res, rej) => {
        return async () => {
          // REQUIRED VALIDATION
          if (rule.required) {
            if (value === '' || value === undefined || value === null) {
              rej(rule.error);
              return false;
            }
          }
          // MATCH VALIDATION
          if (rule.match) {
            if (rule.match !== value) {
              rej(rule.error);
              return false;
            }
          }
          // TYPE VALIDATION
          if (rule.type) {
            switch (rule.type) {
              case 'email':
                if (value && !validator.isEmail(value)) {
                  rej(rule.error);
                  return false;
                }
                break;
              // case 'date': {
              //   if (value && !moment(value, 'DD.MM.YYYY', true).isValid()) {
              //     rej(rule.error);
              //     return false;
              //   }
              //   break;
              // }
              // case 'time': {
              //   if (value && !moment(value, 'HH:mm', true).isValid()) {
              //     rej(rule.error);
              //     return false;
              //   }
              //   break;
              // }
              case 'url':
                if (
                  value &&
                  !validator.isURL(value, {
                    protocols: ['http', 'https'],
                    require_protocol: true,
                  })
                ) {
                  rej(rule.error);
                  return false;
                }
                break;
              case 'username': {
                const usernameRegex = new RegExp(
                  '^(?=.*[a-zA-Z]{1,})(?=.*[d]{0,})[a-zA-Z0-9]{2,15}$',
                );
                if (value && !usernameRegex.test(value)) {
                  rej(rule.error);
                  return false;
                }
                break;
              }
              case 'phonenumber': {
                const phonenumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
                if (value && !phonenumberRegex.test(value)) {
                  rej(rule.error);
                  return false;
                }
                break;
              }
              case 'notzero': {
                const notZeroRegex = /^(?!0+$)[a-zA-Z0-9]+$/g;
                if (value && !notZeroRegex.test(value)) {
                  rej(rule.error);
                  return false;
                }
                break;
              }
              case 'number': {
                const numberregex = /^[0-9]*$/g;
                if (value && !numberregex.test(value)) {
                  rej(rule.error);
                  return false;
                }
                break;
              }
              default:
                break;
            }
          }
          // REGEX VALIDATION
          if (rule.regex) {
            if (!rule.regex.test(value)) {
              rej(rule.error);
              return false;
            }
          }
          // MIN VALIDATION
          if (rule.min) {
            if (typeof value === 'string' && value.length < rule.min) {
              rej(rule.error);
              return false;
            }
            if (typeof value === 'number' && value < rule.min) {
              rej(rule.error);
              return false;
            }
          }
          // MAX VALIDATION
          if (rule.max) {
            if (typeof value === 'string' && value.length > rule.max) {
              rej(rule.error);
              return false;
            }
            if (typeof value === 'number' && value > rule.max) {
              rej(rule.error);
              return false;
            }
          }
          // CUSTOM VALIDATION
          if (rule.custom && typeof rule.custom === 'function') {
            const customValue = await rule.custom(value);
            if (!customValue) {
              rej(rule.error);
              return false;
            }
          }
          return res();
        };
      });
    });
    Promise.all(promises).then(resolve).catch(reject);
  })
    .then(() => {
      return {
        isValid: true,
        error: '',
      };
    })
    .catch((error) => {
      return {
        isValid: false,
        error,
      };
    });
}
