import formatter from '../src/formatter'
import assert from 'assert'

describe('formatter', () => {
  it('should format latex', () => {
    const parsedLatex1 = [
      {
        type: 'token',
        value: 'frac'
      },
      {
        type: 'group',
        value: [
          {
            type: 'number',
            value: '2'
          },
          {
            type: 'operator',
            value: '^'
          },
          {
            type: 'group',
            value: [
              {
                type: 'number',
                value: '3'
              }
            ]
          },
          {
            type: 'operator',
            value: '+'
          },
          {
            type: 'number',
            value: '3'
          }
        ]
      },
      {
        type: 'group',
        value: [
          {
            type: 'operator',
            value: '+'
          },
          {
            type: 'number',
            value: '3'
          }
        ]
      }
    ]

    const parsedLatex2 = [
      {
        type: 'token',
        value: 'sqrt'
      }, {
        type: 'group',
        value: [
          {
            type: 'number',
            value: '123'
          }
        ]
      }
    ]

    const parsedLatex3 = [
      {
        type: 'variable',
        value: 'y'
      }, {
        type: 'operator',
        value: '='
      }, {
        type: 'variable',
        value: 'a'
      }, {
        type: 'variable',
        value: 'x'
      }, {
        type: 'operator',
        value: '+'
      }, {
        type: 'number',
        value: '2'
      }, {
        type: 'variable',
        value: 'b'
      }
    ]

    assert.equal(formatter(parsedLatex1), '((2^(3)+3)/(3))', 'Long latex example')
    assert.equal(formatter(parsedLatex2), '(sqrt(123))', 'sqrt example')
    assert.equal(formatter(parsedLatex3), '(y=a*x+2*b)')
  })

  describe('greek letters', () => {
    it('should format lower case', () => {
      const parsedLatex = [
        {
          type: 'token',
          value: 'alpha'
        }, {
          type: 'token',
          value: 'delta'
        }, {
          type: 'token',
          value: 'gamma'
        }
      ]

      assert.equal(formatter(parsedLatex), '(αδγ)')
    })

    it('should format upper case', () => {
      const parsedLatex = [
        {
          type: 'token',
          value: 'Alpha'
        }, {
          type: 'token',
          value: 'Delta'
        }, {
          type: 'token',
          value: 'Gamma'
        }
      ]

      assert.equal(formatter(parsedLatex), '(ΑΔΓ)')
    })
  })

  describe('error handling', () => {
    it('Should return error for fragments', () => {
      const latex1 = [
        {
          type: 'token',
          value: 'frac'
        },
        {
          type: 'group',
          value: [
            {
              type: 'number',
              value: '1'
            }
          ]
        },
        {
          type: 'number',
          value: '2'
        }
      ]

      const latex2 = [
        {
          type: 'token',
          value: 'frac'
        },
        {
          type: 'number',
          value: '2'
        }
      ]

      const expectedError = /Fraction must have 2 following parameters/

      assert.throws(() => { throw formatter(latex1) }, expectedError, 'Example with one parameter following fraction')
      assert.throws(() => { throw formatter(latex2) }, expectedError, 'Example with no parameters following fraction')
    })
  })
})
