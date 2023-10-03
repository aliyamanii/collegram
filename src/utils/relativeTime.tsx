export const relativeTime = (time: string | number) => {
  let timeStamp;
  if (typeof time === "string") {
    timeStamp = new Date(time).getTime();
  } else if (typeof time === "number") {
    timeStamp = time * 1000;
  } else {
    throw new Error("invalid input");
  }

  const now = Date.now();
  const timeDifference = (now - timeStamp) / 1000;
  const year = 31449600;
  const month = 2592000;
  const week = 604800;
  const day = 86400;
  const hour = 3600;
  const minute = 60;

  if (timeDifference >= year) {
    return (
      <div className="flex gap-1">
        <div>سال پیش </div>
        {Math.floor(timeDifference / year)}
      </div>
    );
  } else if (timeDifference >= month) {
    return (
      <div className="flex gap-1">
        <div>ماه پیش </div>
        {Math.floor(timeDifference / month)}
      </div>
    );
  } else if (timeDifference >= week) {
    return (
      <div className="flex gap-1">
        <div>هفته پیش </div>
        {Math.floor(timeDifference / week)}
      </div>
    );
  } else if (timeDifference >= day) {
    return (
      <div className="flex gap-1">
        <div>روز پیش </div>
        {Math.floor(timeDifference / day)}
      </div>
    );
  } else if (timeDifference >= hour) {
    return (
      <div className="flex gap-1">
        <div>ساعت پیش </div>
        {Math.floor(timeDifference / hour)}
      </div>
    );
  } else if (timeDifference >= minute) {
    return (
      <div className="flex gap-1">
        <div>دقیقه پیش </div>
        {Math.floor(timeDifference / minute)}
      </div>
    );
  } else {
    return "لحظاتی پیش";
  }
};
