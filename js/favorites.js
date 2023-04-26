import { GithubUser } from "./githubUser.js"
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
    GithubUser.search('maykbrito').then(user => {
      console.log(user)
    })
  }
  load() {
    this.entries = JSON.parse(localStorage.getItem('@gitfav:')) || []
    console.log(this.entries)
  }
  async add(username) {
    const user = await GithubUser.search(username)
    console.log(user)
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry =>
      entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
    // this.save()
  }

}
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.root.querySelector('table tbody')
    this.update()
    this.onadd()
  }
  onadd() {
    const addButton = document.querySelector('header .search button')
    addButton.onclick = () => {
      const { value } = document.querySelector('header .search input')
      this.add(value)
    }

  }
  update() {
    this.removeAllTr()
    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user img').alt = `Imagem do perfil do ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = `${user.login}`
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm(`Deseja remover ${user.name} da lista de favoritos?`)
        if (isOk) {
          this.delete(user)
        }

      }
      this.tbody.append(row)

    })


  }
  removeAllTr() {

    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()

    })
  }

  createRow() {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td class="user">
                      <img src="https://github.com/maykbrito.png" alt="Imagem de maykbrito"/>
                      <a href="https://github.com/maykbrito" target="_blank">
                        <p>Mayk Brito</p><span>maykbrito</span></a>
                   </td>
                  <td class="repositories">76</td>
                  <td class="followers">9589</td>
                  <td><button class="remove">Remover</button></td>`
    return tr
  }
}