import { expect } from 'chai'
import buildObjectPath from '../src'
import ObjectPathBuilder from '../src/object-path-builder';
import Binding from '../src/binding';

describe('Object path builder', () => {

  it('should return correct object path', (done) => {
    const bindings = {
      a: 'A',
      b: 'B',
    }
    const result = buildObjectPath("abc.def[a][b].ghi['jk-l']['mn.o'].pqr['stu']['vw'].xyz", bindings)
    expect(result).to.deep.equal(['abc', 'def', 'A', 'B', 'ghi', 'jk-l', 'mn.o', 'pqr', 'stu', 'vw', 'xyz'])
    done()
  });

  it('should return correct object path for any depth of binding mapping', (done) => {
    const bindings = {
      a: {
        b: {
          c: {
            'e': 'E'
          }
        }
      }
    }
    const result = buildObjectPath('abc.def[a.b.c[e]]["F"]', bindings)
    expect(result).to.deep.equal(['abc', 'def', 'E', 'F'])
    done()
  });

  it('should throw error on unknown key binding', (done) => {
    expect(() => buildObjectPath('abc[a]')).to.throw(Error);
    done()
  });

  it('should throw error on wrong syntax', (done) => {
    expect(() => buildObjectPath('abc[a.')).to.throw(Error);
    expect(() => buildObjectPath('abc[a.\'')).to.throw(Error);
    expect(() => buildObjectPath('abc[a.[')).to.throw(Error);
    expect(() => buildObjectPath('abc[]')).to.throw(Error);
    done()
  });

});
