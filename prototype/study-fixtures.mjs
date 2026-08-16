export const STUDY_FIXTURE_VERSION = "signalsafe-study-fixtures-v1";

const makeStat = (opportunities, hits) => Object.freeze({ opportunities, hits });
const makeCategory = (fullOpportunities, fullHits, quickOpportunities = 0, quickHits = 0) => Object.freeze({
  full: makeStat(fullOpportunities, fullHits),
  quick: makeStat(quickOpportunities, quickHits),
});

export const STUDY_FIXTURES = Object.freeze({
  "seeded-learning-history-v1": Object.freeze({
    id: "seeded-learning-history-v1",
    version: STUDY_FIXTURE_VERSION,
    synthetic: true,
    anonymous: true,
    purpose: "T03 dashboard independent starting state",
    categories: Object.freeze({
      tactic: makeCategory(6, 4),
      source: makeCategory(6, 2),
      action: makeCategory(6, 5),
      money: makeCategory(5, 4),
    }),
  }),
  "seeded-weakness-source-v1": Object.freeze({
    id: "seeded-weakness-source-v1",
    version: STUDY_FIXTURE_VERSION,
    synthetic: true,
    anonymous: true,
    purpose: "T04 weakness-to-practice independent starting state",
    categories: Object.freeze({
      tactic: makeCategory(6, 5),
      source: makeCategory(6, 1),
      action: makeCategory(6, 5),
      money: makeCategory(6, 4),
    }),
  }),
});

export function getStudyFixture(id) {
  return id && Object.hasOwn(STUDY_FIXTURES, id) ? STUDY_FIXTURES[id] : null;
}
