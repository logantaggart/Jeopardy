async function jeopardy() {
      const resp = await axios.get('https://jservice.io/api/categories?count=100')
      const board = document.querySelector('#board')
      const top = document.createElement("tr")
        top.setAttribute("id", "column-top")
      const catInfo = []

      for (let x = 0; x < 6; x++) {
        headCell = document.createElement("td")
        const catName = resp.data[Math.floor(Math.random() * 100)]
        headCell.append(catName.title.toUpperCase())
        catInfo.push(catName)
        top.append(headCell)
      }

      board.append(top)

      for (let y = 0; y < 5; y++) {
        const row = document.createElement("tr")

        for (let x = 0; x < 6; x++) {
          const cell = document.createElement("td")
          const respClues = await axios.get(`https://jservice.io/api/clues?category=${catInfo[x].id}`)
          cell.innerHTML = "<p>?</p>"
    
          cell.addEventListener("click", function() {
            cell.innerHTML = respClues.data[y].question

          setTimeout(function() {
            cell.innerHTML = respClues.data[y].answer
            }, 10000)
          })

        row.append(cell)
        }
        board.append(row)
      }
}

    let btn = document.querySelector('#new')
    btn.addEventListener('click', function() {
      location.reload()
    })

jeopardy()














