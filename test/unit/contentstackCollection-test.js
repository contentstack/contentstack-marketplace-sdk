import { describe, it } from 'mocha'
import ContentstackCollection from '../../lib/contentstackCollection'
import axios from 'axios'
import { AppCollection } from '../../lib/marketplace'
import { expect } from 'chai'
import { mockCollection, stackMock } from './mock/objects'

describe('Contentstack collection test', () => {
  it('Collection with no Data', done => {
    const stackResponse = new ContentstackCollection({}, axios, null, AppCollection)
    expect(stackResponse.items.length).to.be.equal(0)
    expect(stackResponse.count).to.be.equal(undefined)
    expect(stackResponse.notice).to.be.equal(undefined)
    expect(stackResponse.schema).to.be.equal(undefined)
    expect(stackResponse.content_type).to.be.equal(undefined)
    done()
  })

  it('Stack Collection', done => {
    const stackResponse = new ContentstackCollection(
      { data: mockCollection(stackMock, 'stacks') },
      axios,
      null,
      AppCollection
    )
    expect(stackResponse.items.length).to.be.equal(0)
    expect(stackResponse.count).to.be.equal(1)
    expect(stackResponse.notice).to.be.equal('Notice')
    expect(stackResponse.schema).to.be.equal(undefined)
    expect(stackResponse.content_type).to.be.equal(undefined)
    done()
  })

  it('Stack Collection with headers', done => {
    const stackResponse = new ContentstackCollection({
      data: mockCollection(stackMock, 'stacks')
    },
    axios,
    {
      api_key: 'stack_api_key'
    },
    AppCollection
    )
    expect(stackResponse.items.length).to.be.equal(0)
    expect(stackResponse.count).to.be.equal(1)
    expect(stackResponse.notice).to.be.equal('Notice')
    expect(stackResponse.schema).to.be.equal(undefined)
    expect(stackResponse.content_type).to.be.equal(undefined)
    done()
  })
})
