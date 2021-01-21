export function debounce(func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 格式化时间日期函数
// date 必须是一个时间日期实例对象 
// format可传入 例如: 'yyyy-MM-dd' 或 'yyyy-MM-dd hh:mm:ss DD'
export function formatDate(date, format) {
  if(!date instanceof Date) throw new Error('Please pass in a Date instance');
  let weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  const formatDate = {
    'yyyy': date.getFullYear(),
    'MM': (date.getMonth() + 1 + '').padStart(2,'0'),
    'dd': (date.getDate()+'').padStart(2,'0'),
    'DD': weekday[date.getDay()],
    'hh': (date.getHours()+'').padStart(2,'0'),
    'mm': (date.getMinutes()+'').padStart(2,'0'),
    'ss': (date.getSeconds()+'').padStart(2,'0')
  }
  let formatDateArray = Object.keys(formatDate);
  let dateFormat = format.split(' ');
  let assort = {
    '-': null,
    ':': null
  };
  let res = [];

  // 处理星期
  dateFormat.map((item, index) => {
    if (item.indexOf('-') !== -1) {
      assort['-'] = index;
      return ;
    } else if (item.indexOf(':') !== -1) {
      assort[':'] = index;
      return ;
    }else{
      formatDateArray.indexOf(item) !== -1 ? res[index] = formatDate[item] : '';
    }
  })

  // 处理格式函数

  function formatHandler(fm) {
    if (assort[fm] !== null) {
      let xxx = dateFormat[assort[fm]].split(fm);
      let xxxRes = xxx.map((item) => {
        let index = formatDateArray.indexOf(item);
        return index !== -1 ? formatDate[item] : '';
      })
      xxx = xxxRes.join(fm);
      return xxx;
    }
    return '';
  }

  // 处理年月日--->(字符串)
  let yMd = formatHandler('-');
  // 处理时间--->(字符串)
  let hms = formatHandler(':');

  // 整合
  res[assort['-']] = yMd;
  res[assort[':']] = hms;
  return res.join(' ');
}
