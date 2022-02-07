export const PrettyPrintJSON = raw => {
  console.log(JSON.stringify(raw, null, 4));
};

export const getCurrentDate = (padded = false) => {
  const date = new Date();

  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  if (padded) {
    month = month.length === 1 ? `0${month}` : month;
    day = day.length === 1 ? `0${day}` : day;
  }

  const d = day;
  const m = month;
  const y = date.getFullYear();
  const currentDate = y + '-' + m + '-' + d;
  console.log({currentDate});

  return currentDate;
};

export const randomHash = (len = 32) => {
  let abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var token = '';
  for (let i = 0; i < len; i++) {
    token += abc[Math.floor(Math.random() * abc.length)];
  }
  return token; //Will return a 32 bit "hash"
};

export const getPaddedString = ({str, paddingCount, padStr, end, start}) => {
  return end
    ? `${str.padEnd(paddingCount, padStr)}${end}`
    : `${start}${str.padStart(paddingCount, padStr)}`;
};

export const getShippingAddressHeading = str => {
  return getPaddedString({
    str,
    paddingCount: 40,
    padStr: ' ',
    end: ':',
  });
};

export const getCurrentLoadsJobsStatus = (data, jobStatus, loadID) => {
  let currentLoadsJobs = [];

  // console.log({getCurrentLoadsJobsStatus: data});

  data.map(arr => {
    const rowData = arr[0];

    const job = jobStatus.find(job => {
      // console.log({
      //   job_id: jobs.job_id,
      //   rowID: rowData.id,
      //   jobLoad_id: jobs.load_id,
      //   loadItem_id: loadItem.id,
      // });

      if (job.job_id === rowData.id && job.load_id === loadID) {
        return true;
      }
      return false;
    });

    if (job) {
      currentLoadsJobs.push(job);
    }
  });

  return currentLoadsJobs;
};
