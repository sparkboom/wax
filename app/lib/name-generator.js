const nameTally = {};

export function getName(category:string){
  if (nameTally[category]){
    nameTally[category] += 1;
  }else {
    nameTally[category] = 1;
  }
  return `${category}${nameTally[category]}`;
};
