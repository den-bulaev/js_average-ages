'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  // write code here
  // learn how to use array methods like .filter .map .some .every .find .reduce
  // avoid using loop and forEach
  // replace `if ()` statement with &&, || or ?:
  // without nesting
  const males = century
    ? people.filter(
      person => person.sex === 'm' && Math.ceil(person.died / 100) === century)

    : people.filter(person => person.sex === 'm');

  return males.reduce(
    (sum, person) => sum + person.died - person.born, 0) / males.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  // write code here
  const mothersData = new Set(people.map(person => person.mother));

  mothersData.delete(null);

  const femalesData = withChildren
    ? people.filter(person => mothersData.has(person.name))

    : people.filter(person => person.sex === 'f');

  return femalesData.reduce(
    (sum, person) => sum + person.died - person.born, 0) / femalesData.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  // write code here
  const mothersData = new Set(people.map(person => person.mother));

  mothersData.delete(null);

  const mothersBornData = people.reduce(function(all, mother) {
    return mothersData.has(mother.name)
      ? {
        ...all,
        [mother.name]: mother.born,
      }

      : all;
  }, {});

  let childrenData = people.reduce(function(all, child) {
    return mothersBornData.hasOwnProperty(child.mother)
      ? [
        ...all,
        {
          name: child.name,
          sex: child.sex,
          born: child.born,
          mother: child.mother,
        },
      ]

      : all;
  }, []);

  childrenData = onlyWithSon
    ? childrenData.filter(child => child.sex === 'm')
    : childrenData;

  return childrenData.reduce(function(sum, child) {
    return sum + child.born - mothersBornData[child.mother];
  }, 0) / childrenData.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
