import pool from '../configs/connectDB'

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute('SELECT * FROM `users`');
  return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
  let userId = req.params.id
  let [user] = await pool.execute(`select * from users where id = ?`, [userId])
  return res.send(JSON.stringify(user))
}

let createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body

  await pool.execute('insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address])
  return res.redirect('/')
}

const deleteUser = async (req, res) => {
  const { userId } = req.body

  await pool.execute('delete from users where id = ?', [userId])
  return res.redirect('/')
}

const getEditPage = async (req, res) => {
  const userId = req.params.id
  const [user] = await pool.execute('select * from users where id = ?', [userId])

  return res.render('update.ejs', { dataUser: user[0] })
}

const postUpdateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body

  await pool.execute('update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ?',
    [firstName, lastName, email, address, id])
  return res.redirect('/')
}

module.exports = {
  getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser
}