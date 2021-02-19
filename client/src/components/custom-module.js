function getAge(value) {
    let arr1 = value.toString().split(' ');
    let arr2 = arr1[0].split('-');
    let age =  new Date().getFullYear() - arr2[0];
    return age;
  }

  
  export { getAge};