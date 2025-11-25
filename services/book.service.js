import { utilService } from 'util.service.js'
import { storageService } from 'async-storage.service.js'

const BOOKS_KEY = 'booksDB'
const gBooks = [
  {
    id: "JWB001",
    title: "The Tanakh - English Edition",
    subtitle: "Complete Hebrew Bible in English",
    authors: ["Multiple Authors"],
    publishedDate: 2005,
    description: "A complete English edition of the Tanakh with notes and commentary for study.",
    pageCount: 1200,
    categories: ["Torah", "Nevi'im", "Ketuvim"],
    thumbnail: "http://coding-academy.org/books-photos/tanakh.jpg",
    language: "en",
    listPrice: { amount: 49, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB002",
    title: "The Mishnah",
    subtitle: "Edited by Herbert Danby",
    authors: ["Herbert Danby"],
    publishedDate: 1933,
    description: "The foundational work of Jewish oral law in English translation.",
    pageCount: 900,
    categories: ["Mishnah", "Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/mishnah.jpg",
    language: "en",
    listPrice: { amount: 59, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB003",
    title: "Talmud Bavli",
    subtitle: "Babylonian Talmud",
    authors: ["Various Rabbis"],
    publishedDate: 2010,
    description: "The Babylonian Talmud, a central text of Rabbinic Judaism, discussing law, ethics, and customs. The Babylonian Talmud, a central text of Rabbinic Judaism, discussing law, ethics, and customs. The Babylonian Talmud, a central text of Rabbinic Judaism, discussing law, ethics, and customs. The Babylonian Talmud, a central text of Rabbinic Judaism, discussing law, ethics, and customs. The Babylonian Talmud, a central text of Rabbinic Judaism, discussing law, ethics, and customs.",
    pageCount: 2500,
    categories: ["Talmud", "Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/talmud-bavli.jpg",
    language: "he",
    listPrice: { amount: 99, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB004",
    title: "Talmud Yerushalmi",
    subtitle: "Jerusalem Talmud",
    authors: ["Various Rabbis"],
    publishedDate: 2012,
    description: "The Jerusalem Talmud, a foundational text for Jewish law and thought.",
    pageCount: 2200,
    categories: ["Talmud", "Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/talmud-yerushalmi.jpg",
    language: "he",
    listPrice: { amount: 89, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB005",
    title: "The Midrash",
    subtitle: "Ancient Jewish Commentary and Stories",
    authors: ["Various Rabbis"],
    publishedDate: 2000,
    description: "Collection of rabbinic commentaries and homiletical teachings on the Torah.",
    pageCount: 1100,
    categories: ["Midrash", "Commentary"],
    thumbnail: "http://coding-academy.org/books-photos/midrash.jpg",
    language: "he",
    listPrice: { amount: 69, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB006",
    title: "Mishneh Torah",
    subtitle: "Code of Jewish Law",
    authors: ["Maimonides"],
    publishedDate: 2000,
    description: "An authoritative codification of Jewish law by Maimonides.",
    pageCount: 1000,
    categories: ["Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/mishneh-torah.jpg",
    language: "he",
    listPrice: { amount: 99, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB007",
    title: "The Guide for the Perplexed",
    subtitle: "Maimonides",
    authors: ["Maimonides"],
    publishedDate: 1190,
    description: "Philosophical work exploring Jewish theology and philosophy for rational understanding.",
    pageCount: 450,
    categories: ["Philosophy", "Jewish Thought"],
    thumbnail: "http://coding-academy.org/books-photos/guide-perplexed.jpg",
    language: "he",
    listPrice: { amount: 39, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB008",
    title: "Sefer Hamitzvot",
    subtitle: "Maimonides",
    authors: ["Maimonides"],
    publishedDate: 1170,
    description: "A list and explanation of the 613 commandments in the Torah according to Maimonides.",
    pageCount: 350,
    categories: ["Mitzvot", "Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/sefer-hamitzvot.jpg",
    language: "he",
    listPrice: { amount: 29, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB009",
    title: "Shulchan Aruch",
    subtitle: "Code of Jewish Law",
    authors: ["Joseph Karo"],
    publishedDate: 1565,
    description: "The standard codification of Jewish law, widely studied and referenced.",
    pageCount: 950,
    categories: ["Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/shulchan-aruch.jpg",
    language: "he",
    listPrice: { amount: 79, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB010",
    title: "The Zohar",
    subtitle: "Kabbalistic Mystical Text",
    authors: ["Moses de León"],
    publishedDate: 1280,
    description: "Foundational work of Kabbalah, exploring mystical aspects of Torah.",
    pageCount: 1500,
    categories: ["Kabbalah", "Mysticism"],
    thumbnail: "http://coding-academy.org/books-photos/zohar.jpg",
    language: "he",
    listPrice: { amount: 99, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB011",
    title: "Tanya",
    subtitle: "Chabad Hasidic Work",
    authors: ["Rabbi Shneur Zalman of Liadi"],
    publishedDate: 1797,
    description: "Fundamental Hasidic text on Jewish spirituality, psychology, and ethical guidance.",
    pageCount: 300,
    categories: ["Hasidism", "Ethics", "Jewish Thought"],
    thumbnail: "http://coding-academy.org/books-photos/tanya.jpg",
    language: "he",
    listPrice: { amount: 35, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB012",
    title: "Mesilat Yesharim",
    subtitle: "Path of the Upright",
    authors: ["Rabbi Moshe Chaim Luzzatto"],
    publishedDate: 1740,
    description: "Classic work on Jewish ethics, character development, and spiritual growth.",
    pageCount: 200,
    categories: ["Ethics", "Mussar"],
    thumbnail: "http://coding-academy.org/books-photos/mesilat-yesharim.jpg",
    language: "he",
    listPrice: { amount: 25, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB013",
    title: "The Kuzari",
    subtitle: "Philosophical Dialogue",
    authors: ["Rabbi Yehuda Halevi"],
    publishedDate: 1140,
    description: "A philosophical work defending Judaism and exploring faith and reason.",
    pageCount: 300,
    categories: ["Philosophy", "Jewish Thought"],
    thumbnail: "http://coding-academy.org/books-photos/kuzari.jpg",
    language: "he",
    listPrice: { amount: 39, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB014",
    title: "Chovot Levavot",
    subtitle: "Duties of the Heart",
    authors: ["Rabbi Bahya ibn Paquda"],
    publishedDate: 1080,
    description: "A classic work on Jewish ethics and spiritual duties of the heart and soul.",
    pageCount: 250,
    categories: ["Ethics", "Jewish Thought"],
    thumbnail: "http://coding-academy.org/books-photos/chovot-levavot.jpg",
    language: "he",
    listPrice: { amount: 29, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB015",
    title: "Sefer Hachinuch",
    subtitle: "Mitzvot and Ethical Teachings",
    authors: ["Rabbi Asher Wasserman"],
    publishedDate: 1250,
    description: "Explains the 613 commandments of the Torah with ethical lessons and rationale.",
    pageCount: 400,
    categories: ["Mitzvot", "Ethics"],
    thumbnail: "http://coding-academy.org/books-photos/sefer-hachinuch.jpg",
    language: "he",
    listPrice: { amount: 39, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB016",
    title: "Mishnah Berurah",
    subtitle: "Commentary on Shulchan Aruch",
    authors: ["Rabbi Yisrael Meir Kagan"],
    publishedDate: 1907,
    description: "Authoritative commentary on Jewish law covering daily observances.",
    pageCount: 700,
    categories: ["Jewish Law"],
    thumbnail: "http://coding-academy.org/books-photos/mishnah-berurah.jpg",
    language: "he",
    listPrice: { amount: 69, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB017",
    title: "Shemirat Halashon",
    subtitle: "Guarding the Tongue",
    authors: ["Rabbi Yisrael Meir Kagan"],
    publishedDate: 1885,
    description: "Guidelines and ethical teachings on proper speech and guarding against lashon hara.",
    pageCount: 300,
    categories: ["Ethics", "Guidance"],
    thumbnail: "http://coding-academy.org/books-photos/shemirat-halashon.jpg",
    language: "he",
    listPrice: { amount: 29, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB018",
    title: "Sidur",
    subtitle: "Jewish Prayer Book",
    authors: ["Multiple Authors"],
    publishedDate: 2010,
    description: "Daily and holiday prayers with instructions for proper recitation.",
    pageCount: 600,
    categories: ["Prayer", "Jewish Liturgy"],
    thumbnail: "http://coding-academy.org/books-photos/sidur.jpg",
    language: "he",
    listPrice: { amount: 15, currencyCode: "USD", isOnSale: true },
    reviews: []
  },
  {
    id: "JWB019",
    title: "Pele Yoetz",
    subtitle: "Ethics and Guidance",
    authors: ["Rabbi Eliezer Papo"],
    publishedDate: 1824,
    description: "Practical ethical guidance and moral lessons for everyday life.",
    pageCount: 350,
    categories: ["Ethics", "Guidance"],
    thumbnail: "http://coding-academy.org/books-photos/pele-yoetz.jpg",
    language: "he",
    listPrice: { amount: 29, currencyCode: "USD", isOnSale: false },
    reviews: []
  },
  {
    id: "JWB020",
    title: "Shaar Hagilgulim",
    subtitle: "Kabbalistic Work on Reincarnation",
    authors: ["Rabbi Chaim Vital"],
    publishedDate: 1600,
    description: "A classic Kabbalistic text exploring the concept of gilgul (reincarnation) in Jewish mysticism.",
    pageCount: 400,
    categories: ["Kabbalah", "Mysticism"],
    thumbnail: "http://coding-academy.org/books-photos/shaar-hagilgulim.jpg",
    language: "he",
    listPrice: { amount: 200, currencyCode: "USD", isOnSale: false },
    reviews: []
  }
]

_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getEmptyBook,
  saveReview,
  removeReview,
  getEmptyReview
}

function query(filterBy = {}) {
  return storageService.query(BOOKS_KEY)
    .then(books => {
      const { title, price, author } = filterBy
      if (title) {
        const regExp = new RegExp(title, 'i')
        books = books.filter(book => regExp.test(book.title))
      }
      if (price) {
        books = books.filter(book => book.listPrice.amount >= price)
      }
      if (author) {
        const regExp = new RegExp(author, 'i')
        books = books.filter(book => regExp.test(book.authors))
      }
      return books
    })
}

function getDefaultFilter() {
  return { title: '', price: '', author: '' }
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOKS_KEY, book)
  } else {
    return storageService.post(BOOKS_KEY, book)
  }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOKS_KEY)
  if (!books || !books.length) {
    books = gBooks
    utilService.saveToStorage(BOOKS_KEY, books)
  }
}

// function _createBook(title, listPrice) {
//   const book = getEmptyBook(title, listPrice)
//   book.id = utilService.makeId()
//   return book
// }

function getEmptyBook() {
  const ctgs = [
    'Commentary', 'Ethics', 'Guidance',
    'Hasidism', 'Jewish Law', 'Jewish Liturgy',
    'Jewish Thought', 'Kabbalah', 'Ketuvim',
    'Mishnah', 'Mitzvot', 'Mussar', 'Mysticism',
    'Nevi\'im', 'Philosophy', 'Prayer', 'Talmud',
    'Torah'
  ]

  return {
    id: '',
    title: '',
    subtitle: utilService.makeLorem(10),
    authors: [],
    publishedDate: new Date().getFullYear(),
    description: '', //utilService.makeLorem()
    categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
    language: "en",
    pageCount: '',
    thumbnail: `http://coding-academy.org/books-photos/default.jpg`,
    listPrice: {
      amount: '',
      currencyCode: "US",
      isOnSale: false
    }
  }
}

function saveReview(bookId, reviewToSave) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      const review = _createReview(reviewToSave)
      book.reviews.unshift(review)
      return storageService.put(BOOKS_KEY, book)
        .then(() => review)
    })
}

function removeReview(bookId, reviewId) {
  return storageService.get(BOOKS_KEY, bookId)
    .then(book => {
      const newReviews = book.reviews.filter((review) => review.id !== reviewId)
      book.reviews = newReviews
      return storageService.put(BOOKS_KEY, book)
    })
}

function getEmptyReview() {
  return {
    fullName: '',
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    txt: '',
    selected: 0,
  }
}

function _createReview(reviewToSave) {
  return {
    id: utilService.makeId(),
    ...reviewToSave,
  }
}