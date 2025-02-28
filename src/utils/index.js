import { getNetworkId } from '../web3'
import { addressUtils } from '@0xproject/utils/lib/src/address_utils'

import {
  isEncodedLabelhash,
  isDecrypted,
  decodeLabelhash,
  encodeLabelhash,
  labelhash
} from './labelhash'
import {
  encodeContenthash,
  decodeContenthash,
  isValidContenthash,
  getProtocolType
} from './contents'
import { normalize } from '@ensdomains/eth-ens-namehash'
import { namehash } from './namehash'

const uniq = (a) => a.filter((item, index) => a.indexOf(item) === index)

async function getEtherScanAddr() {
  const networkId = await getNetworkId()
  switch (networkId) {
    case 89:
    case '89':
      return 'https://testnet.tomoscan.io/'
  }
}

async function getEnsStartBlock() {
  const networkId = await getNetworkId()
  switch (networkId) {
    case 89:
    case '89':
      return 39369250
    default:
      return 0
  }
}

const mergeLabels = (labels1, labels2) =>
  labels1.map((label, index) => (label ? label : labels2[index]))

function validateName(name) {
  const nameArray = name.split('.')
  const hasEmptyLabels = nameArray.some((label) => label.length == 0)
  if (hasEmptyLabels) throw new Error('Domain cannot have empty labels')
  const normalizedArray = nameArray.map((label) => {
    if (label === '[root]') {
      return label
    } else {
      return isEncodedLabelhash(label) ? label : normalize(label)
    }
  })
  try {
    return normalizedArray.join('.')
  } catch (e) {
    throw e
  }
}

function isLabelValid(name) {
  try {
    validateName(name)
    if (name.indexOf('.') === -1) {
      return true
    }
  } catch (e) {
    console.log(e)
    return false
  }
}

const parseSearchTerm = (term, validTld) => {
  console.log({term, validTld});
  let regex = /[^.]+$/

  try {
    validateName(term)
  } catch (e) {
    return 'invalid'
  }

  if (term.indexOf('.') !== -1) {
    const termArray = term.split('.')
    const tld = term.match(regex) ? term.match(regex)[0] : ''
    if (validTld) {
      if (tld === 'tomo' && [...termArray[termArray.length - 2]].length < 3) {
        // code-point length
        return 'short'
      }
      return 'supported'
    }

    return 'unsupported'
  } else if (addressUtils.isAddress(term)) {
    return 'address'
  } else {
    //check if the search term is actually a tld
    if (validTld) {
      return 'tld'
    }
    return 'search'
  }
}

const emptyAddress = '0x0000000000000000000000000000000000000000'

export {
  // general utils
  uniq,
  emptyAddress,
  getEtherScanAddr,
  getEnsStartBlock,
  // name validation
  validateName,
  parseSearchTerm,
  isLabelValid,
  // labelhash utils
  labelhash,
  isEncodedLabelhash,
  isDecrypted,
  decodeLabelhash,
  encodeLabelhash,
  // namehash utils
  namehash,
  // contents utils
  encodeContenthash,
  decodeContenthash,
  isValidContenthash,
  getProtocolType
}
