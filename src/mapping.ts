import { BigInt } from "@graphprotocol/graph-ts"
import {
  TokenDistro,
  Allocate,
  Assign,
  ChangeAddress,
  Claim,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  StartTimeChanged
} from "../generated/TokenDistro/TokenDistro"
import {Balance, ExampleEntity} from "../generated/schema"

export function handleAllocate(event: Allocate): void {

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.DISTRIBUTOR_ROLE(...)
  // - contract.balances(...)
  // - contract.cancelable(...)
  // - contract.claimableAt(...)
  // - contract.claimableNow(...)
  // - contract.cliffTime(...)
  // - contract.duration(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.getTimestamp(...)
  // - contract.globallyClaimableAt(...)
  // - contract.hasRole(...)
  // - contract.initialAmount(...)
  // - contract.lockedAmount(...)
  // - contract.startTime(...)
  // - contract.supportsInterface(...)
  // - contract.token(...)
  // - contract.totalTokens(...)
}

export function handleAssign(event: Assign): void {
  const id = event.params.distributor.toHex()
  const amount = event.params.amount;
  if (!id){
    return
  }
  let balance = Balance.load(id )
  if (balance){
    balance.amount.plus(amount)
  }else{
    balance = new Balance(id )
    balance.address = id
    balance.amount = amount
  }
  balance.save();

}

export function handleChangeAddress(event: ChangeAddress): void {}

export function handleClaim(event: Claim): void {
  const id = event.params.grantee.toHex()
  const amount = event.params.amount;
  let balance = Balance.load(id )
  if (!balance){
    // There should be an assign before any claim, so it's not possible to user claim before assign
    return;
  }
  balance.amount.minus(amount)
  balance.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleStartTimeChanged(event: StartTimeChanged): void {}
