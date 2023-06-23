import { Contract } from '@tomochain-name-service/ethers'
import {
  BaseRegistrarImplementation as permanentRegistrarContract,
  BulkRenewal as bulkRenewalContract,
  TomoNs as tnsContract,
  ETHRegistrarController as permanentRegistrarControllerContract,
  DNSRegistrar as dnsRegistrarContract,
  Resolver as resolverContract,
  ReverseRegistrar as reverseRegistrarContract,
  TestRegistrar as testRegistrarContract,
} from '@tomochain-name-service/tns-contracts/'

function getReverseRegistrarContract({ address, provider }) {
  return new Contract(address, reverseRegistrarContract, provider)
}

function getResolverContract({ address, provider }) {
  console.log('getResolverContract', {address, provider, resolverContract});
  return new Contract(address, resolverContract, provider)
}

function getENSContract({ address, provider }) {
  console.log('getENSContract', {address, tnsContract, provider});
  return new Contract(address, tnsContract, provider)
}

function getTestRegistrarContract({ address, provider }) {
  return new Contract(address, testRegistrarContract, provider)
}

function getDnsRegistrarContract({ parentOwner, provider }) {
  return new Contract(parentOwner, dnsRegistrarContract, provider)
}

function getPermanentRegistrarContract({ address, provider }) {
  return new Contract(address, permanentRegistrarContract, provider)
}

function getPermanentRegistrarControllerContract({ address, provider }) {
  return new Contract(address, permanentRegistrarControllerContract, provider)
}

function getBulkRenewalContract({ address, provider }) {
  return new Contract(address, bulkRenewalContract, provider)
}

export {
  getTestRegistrarContract,
  getReverseRegistrarContract,
  getENSContract,
  getResolverContract,
  getDnsRegistrarContract,
  getPermanentRegistrarContract,
  getPermanentRegistrarControllerContract,
  getBulkRenewalContract,
}
