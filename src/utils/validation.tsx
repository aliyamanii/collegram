export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const identifierValidation = () => {
  return {
    required: { value: true, message: "این فیلد اجباریست" },
    validate: (value: string) => {
      return (
        emailRegex.test(value) ||
        /^[a-z][a-z1-9_]{3,63}$/i.test(value) ||
        "مقدار وارد شده یک ایمیل یا نام کاربری صحیح نمی باشد"
      );
    },
  };
};

export const usernameValidation = () => {
  return {
    required: { value: true, message: "فیلد نام کاربری اجباری است" },
    minLength: {
      value: 4,
      message: "نام کاربری نمی تواند کمتر از 4 کارکتر باشد",
    },
    maxLength: {
      value: 64,
      message: "نام کاربری نمی تواند بیشتر از 64 کارکتر باشید",
    },
    validate: {
      validCharacterCheck: (value: string) => {
        return (
          /^[a-z1-9_]{0,}$/i.test(value) ||
          "نام کاربری تنها میتواند شامل حروف انگلیسی ،اعداد و _ باشد"
        );
      },
      firstCharacterCheck: (value: string) => {
        return (
          /^[a-z]/i.test(value) ||
          "نام کاربری تنها میتواند با حروف انگلیسی شروع شود"
        );
      },
    },
  };
};

export const emailValidation = () => {
  return {
    required: { value: true, message: "فیلد ایمیل اجباریست" },
    pattern: {
      value: emailRegex,
      message: "مقدار وارد شده یک ایمیل صحیح نیست",
    },
  };
};

export const passwordValidation = () => {
  return {
    required: {
      value: true,
      message: "فیلد پسورد اجباریست",
    },
    pattern: {
      value: /^[a-z0-9]{0,}$/i,
      message: "رمز عبور فقط شامل حروف بزرگ و کوجک انگلیسی و اعداد است",
    },
    minLength: {
      value: 8,
      message: "رمز عبور باید بیشتر از 8 کارکتر باشید",
    },
    maxLength: {
      value: 32,
      message: "رمز عبور باید کمتر از 32 کارکتر باشد",
    },
    validate: (value: string) => {
      if (value === "") return true;
      return (
        (/[a-z]/g.test(value) && /[A-Z]/g.test(value) && /\d/g.test(value)) ||
        "رمز عبور باید هم حرف بزرگ و هم حرف کوچک و هم عدد داشته باشد"
      );
    },
  };
};

export const confirmPasswordValidation = (password: string) => {
  return {
    required: { value: true, message: "فیلد تکرار رمز عبور اجباریست" },
    validate: (value: string) => {
      return password === value || "تکرار رمز عبور برابر با رمز عبور نیست";
    },
  };
};

export const firstNameValidation = () => {
  return {
    required: { value: true, message: "فیلد نام اجباریست" },
    pattern: {
      value: /^[\u0600-\u06FFa-z\s]+$/i,
      message:
        "نام تنها میتواند از حروف انگلیسی و فارسی و فاصله تشکیل شده باشید ",
    },
  };
};

export const lastNameValidation = () => {
  return {
    required: { value: true, message: "فیلد نام خانوادگی اجباریست" },
    pattern: {
      value: /^[\u0600-\u06FFa-z\s]+$/i,
      message:
        "نام خانوادگی تنها میتواند از حروف انگلیسی و فارسی و فاصله تشکیل شده باشید ",
    },
  };
};

export const editPasswordValidation = () => {
  return { ...passwordValidation(), required: false };
};

export const editConfirmPasswordValidation = (password: string) => {
  return { ...confirmPasswordValidation(password), required: false };
};

export const editLastNameValidation = () => {
  return { ...lastNameValidation, required: false };
};

export const editFirstNameValidation = () => {
  return { ...firstNameValidation, required: false };
};

export const descriptionValidation = () => {
  return {
    required: { value: true, message: "فیلد توضیحات اجباریست" },
  };
};

export const tagsValidation = () => {
  return {
    required: { value: true, message: "فیلد تگ ها اجباریست" },
  };
};
