import React, { Component } from 'react'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import css from '../static/scss/pages/list.scss'

class List extends Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps(context) {
    try {
      const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
      const data = await res.json()
      console.log(`Show data fetched. Count: ${data.length}`)
      return {
        shows: data
      }
    } catch (e) {
      console.error(e)
      return {
        shows: []
      }
    }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>List</title>
          <meta name="description" content="this is list" />
        </Head>
        <h1 className={css.title}>Batman TV Shows</h1>
        <ul className={css.list}>
          {this.props.shows.map(({show}) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>
                  <div className={css.thumbnail}><img src={require(`../static/img/noimage.png`)} alt=""/></div>
                  <span className={css.text}>{show.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default List