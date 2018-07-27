/* eslint-disable promise/always-return */
import { runQuery } from "test/utils"
import sampleOrder from "test/fixtures/results/sample_order"
import exchangeOrderJSON from "test/fixtures/exchange/order.json"
import { mockxchange } from "test/fixtures/exchange/mockxchange"

let rootValue

describe("Approve Order Mutation", () => {
  beforeEach(() => {
    const resolvers = {
      Mutation: {
        setPayment: () => ({
          order: exchangeOrderJSON,
          errors: [],
        }),
      },
    }

    rootValue = mockxchange(resolvers)
  })
  it("sets order's payment information", () => {
    const mutation = `
      mutation {
        setOrderPayment(input: {
            orderId: "111",
            creditCardId: "1231-1232-4343-4343"
          }) {
            result {
              order {
                id
                code
                currencyCode
                state
                fulfillmentType
                shippingAddressLine1
                shippingAddressLine2
                shippingCity
                shippingCountry
                shippingPostalCode
                shippingRegion
                itemsTotalCents
                shippingTotalCents
                taxTotalCents
                commissionFeeCents
                transactionFeeCents
                buyerTotalCents
                sellerTotalCents
                itemsTotal
                shippingTotal
                taxTotal
                commissionFee
                transactionFee
                buyerTotal
                sellerTotal
                updatedAt
                createdAt
                stateUpdatedAt
                stateExpiresAt
                partner {
                  id
                  name
                }
                user {
                  id
                  email
                }
                lineItems {
                  edges {
                    node {
                      artwork {
                        id
                        title
                        inventoryId
                      }
                    }
                  }
                }
              }
            errors
            }
          }
        }
    `

    return runQuery(mutation, rootValue).then(data => {
      expect(data.setOrderPayment.result.order).toEqual(sampleOrder)
    })
  })
})