const express = require('express');
const app = express();

const models = require('./server/models');
const User = models.User;
const Company = models.Company;
const WorkingDay = models.WorkingDay;

app.get('/company', function (req, res) {
    Company.create({
        name: "My super company"
      })
      .then((newCompany) => {
        // The get() function allows you to recover only the DataValues of the object
        console.log(newCompany.get())
      })
      .catch((err) => {
        console.log("Error while company creation : ", err)
      })
});

app.get('/users', function (req, res) {
    User.bulkCreate([
        {email: 'john-doe@domain.com', firstName: 'John',  lastName: 'DOE', companyId: 1},
        {email: 'log_w@domain.com', firstName: 'Logan',  lastName: 'WOLVERINE', companyId: 1},
        {email: 'john-connor@domain.com', firstName: 'John',  lastName: 'CONNOR', companyId: 1}
      ])
      .then((newUsers) => {
        console.log(newUsers)
      })
      .catch((err) => {
        console.log("Error while users creation : ", err)
      })
})

app.get('/recovery', function (req, res) {
    User.findOne({
        where: {email: 'john-connor@domain.com'}, include: 'company'
      })
      .then((findedUser) => {
        console.log(findedUser)
        //res.send(findedUser);
      })
      .catch((err) => {
        console.log("Error while find user : ", err)
      })

      Company.findByPk(1, {include: ['employes']})
    .then((company) => {
      // Get the Company with Users (employes) datas included
      console.log(company)
      // Get the Users (employes) records only
      // console.log(company.get().employes)
      res.send(company);
})
.catch((err) => {
  console.log("Error while find company : ", err)
})
})  

app.get('/workingDay', function (req, res) {
  let currentDate = new Date();

  WorkingDay.bulkCreate([
    {
      weekDay: 'Monday',
      workingDate: currentDate,
      isWorking: true
    },
    {
      weekDay: 'Tuesday',
      workingDate: currentDate,
      isWorking: true
    },
    {
      weekDay: 'Wednesday',
      workingDate: currentDate,
      isWorking: false
    }
  ])
  .then((workingDays) => {
    User.findAll({where: {id: [4, 5, 6]}, include: ['days']})
    .then((users) => {
      // For user 1, 2 and 3 set the sames workingDays
      users.forEach(user => {
        user.setDays(workingDays) // workingDays is an array (one user hasMany workingDays)
        .then((joinedUsersWorkingDays) => {
          console.log(joinedUsersWorkingDays)
          //res.send(joinedUsersWorkingDays)
        })
        .catch((err) => console.log("Error while joining Users and WorkingDays : ", err))
      });
    })
    .catch((err) => console.log("Error while Users search : ", err))
  })
  .catch((err) => console.log("Error while WorkingDay creation : ", err))


})

app.get('/recoveryWorkingDay', function (req, res) {
  User.findByPk(4, {include: ['days']})
.then((user) => {
  console.log(user.get())
})
.catch((err) => console.log("Error while searching user : ", err))

// Get Users for a given WorkingDay
WorkingDay.findByPk(1,  {include: ['employes']})
.then((workingDay) => {
  console.log(workingDay.get())
})
.catch((err) => console.log("Error while searching workingDay : ", err))
})

      
      







app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});