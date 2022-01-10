import confirmTake from '@/api/user.js'
export default {
  async getconfirm() {
    return new Promise((resolve, reject) => {
      confirmTake()
        .then(function (response) {
          console.log(response);
          if (response.error === 0) {
            resolve(response)
          }
        })
        .catch(function (error) {
          reject(error)
        });
    })
  }

}
