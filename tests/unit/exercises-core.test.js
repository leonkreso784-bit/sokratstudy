/* eslint-disable no-console */
// ===== Node unit testovi za js/exercises-core.js =====
// Pokreni: `npm run test:unit`  (ili: node tests/unit/exercises-core.test.js)
// Bez frameworka — mali runner + node `assert`. Izlaz != 0 ako ijedan test padne.
// Ovo je najjeftinija zaštita "bez bugova" za jezgru ocjenjivanja (vidi docs/architecture/EXERCISES_ENGINE.md §3).

const assert = require('assert');
const path = require('path');
const {
    parseAmount, formatAmount, numEq, numEqMoney, gradeSet, toCents, seededRandom, pickParams,
    gradeChoice, gradeNumeric, gradeStatement, statementCells, gradeClassify, gradeJournal,
    normalizeCite, gradeCite
} = require(path.join(__dirname, '..', '..', 'js', 'exercises-core.js'));

let passed = 0;
let failed = 0;
function test(name, fn) {
    try { fn(); passed++; console.log('  ✓ ' + name); }
    catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== exercises-core ===\n');

// ---------------------------------------------------------------- parseAmount
test('parseAmount: plain integer', () => assert.strictEqual(parseAmount('120000'), 120000));
test('parseAmount: US thousands comma', () => assert.strictEqual(parseAmount('120,000'), 120000));
test('parseAmount: EU thousands dot', () => assert.strictEqual(parseAmount('120.000'), 120000));
test('parseAmount: dot decimal (2)', () => assert.strictEqual(parseAmount('63.60'), 63.6));
test('parseAmount: comma decimal (2)', () => assert.strictEqual(parseAmount('63,60'), 63.6));
test('parseAmount: US full 1,234.56', () => assert.strictEqual(parseAmount('1,234.56'), 1234.56));
test('parseAmount: EU full 1.234,56', () => assert.strictEqual(parseAmount('1.234,56'), 1234.56));
test('parseAmount: big EU 1.234.567,89', () => assert.strictEqual(parseAmount('1.234.567,89'), 1234567.89));
test('parseAmount: multi comma thousands', () => assert.strictEqual(parseAmount('1,234,567'), 1234567));
test('parseAmount: currency + grouping', () => assert.strictEqual(parseAmount('$120,000.00'), 120000));
test('parseAmount: spaces as grouping', () => assert.strictEqual(parseAmount('  120 000,50 '), 120000.5));
test('parseAmount: leading decimal .5', () => assert.strictEqual(parseAmount('.5'), 0.5));
test('parseAmount: trailing dot 5.', () => assert.strictEqual(parseAmount('5.'), 5));
test('parseAmount: negative sign', () => assert.strictEqual(parseAmount('-50'), -50));
test('parseAmount: accounting parentheses', () => assert.strictEqual(parseAmount('(50)'), -50));
test('parseAmount: parentheses + currency', () => assert.strictEqual(parseAmount('($1,250.00)'), -1250));
test('parseAmount: empty → NaN', () => assert.ok(Number.isNaN(parseAmount(''))));
test('parseAmount: letters → NaN', () => assert.ok(Number.isNaN(parseAmount('abc'))));
test('parseAmount: null → NaN', () => assert.ok(Number.isNaN(parseAmount(null))));
test('parseAmount: passes through Number', () => assert.strictEqual(parseAmount(63.6), 63.6));

// ---------------------------------------------------------------- formatAmount
test('formatAmount: default 2dp + grouping', () => assert.strictEqual(formatAmount(120000), '120,000.00'));
test('formatAmount: decimals', () => assert.strictEqual(formatAmount(63.6), '63.60'));
test('formatAmount: currency', () => assert.strictEqual(formatAmount(1250, { currency: '$' }), '$1,250.00'));
test('formatAmount: zero decimals', () => assert.strictEqual(formatAmount(1234, { decimals: 0 }), '1,234'));
test('formatAmount: EU locale separators', () =>
    assert.strictEqual(formatAmount(1234567.89, { groupSep: '.', decimalSep: ',', currency: '€' }), '€1.234.567,89'));
test('formatAmount: negative', () => assert.strictEqual(formatAmount(-50.5), '-50.50'));
test('formatAmount: non-finite → empty', () => assert.strictEqual(formatAmount(NaN), ''));

// ---------------------------------------------------------------- numEq
test('numEq: exact', () => assert.ok(numEq(1.9, 1.9)));
test('numEq: within default tol', () => assert.ok(numEq(1.902, 1.9)));
test('numEq: at boundary 0.005', () => assert.ok(numEq(1.905, 1.9)));
test('numEq: outside default tol', () => assert.ok(!numEq(1.92, 1.9)));
test('numEq: custom tol pass', () => assert.ok(numEq(1.95, 1.9, 0.1)));
test('numEq: parses string input', () => assert.ok(numEq('1.9', 1.9)));
test('numEq: NaN input → false', () => assert.ok(!numEq('abc', 1.9)));

// ---------------------------------------------------------------- numEqMoney
test('numEqMoney: exact', () => assert.ok(numEqMoney(259700, 259700)));
test('numEqMoney: cents float-safe', () => assert.ok(numEqMoney(63.6, 63.60)));
test('numEqMoney: rounds to cents', () => assert.ok(numEqMoney(63.604, 63.60)));
test('numEqMoney: 0.1+0.2 vs 0.3', () => assert.ok(numEqMoney(0.1 + 0.2, 0.3)));
test('numEqMoney: differs by a cent → false', () => assert.ok(!numEqMoney(63.61, 63.60)));
test('numEqMoney: string input', () => assert.ok(numEqMoney('120,000.00', 120000)));
test('numEqMoney: negative', () => assert.ok(numEqMoney(-1250, -1250)));
test('toCents: classic 1.005 boundary', () => assert.strictEqual(toCents(1.005), 101));

// ---------------------------------------------------------------- gradeSet
const exp = [
    { account: 'Cash', side: 'D', amount: 3000 },
    { account: 'Accounts Payable', side: 'C', amount: 3000 }
];
test('gradeSet: same order → correct', () => {
    const r = gradeSet(exp, [
        { account: 'Cash', side: 'D', amount: 3000 },
        { account: 'Accounts Payable', side: 'C', amount: 3000 }
    ]);
    assert.ok(r.correct && r.score === 2 && r.max === 2 && r.missing === 0 && r.extra === 0);
});
test('gradeSet: reversed order → still correct (order-independent)', () => {
    const r = gradeSet(exp, [
        { account: 'Accounts Payable', side: 'C', amount: 3000 },
        { account: 'Cash', side: 'D', amount: 3000 }
    ]);
    assert.ok(r.correct && r.score === 2);
});
test('gradeSet: case/space insensitive account name', () => {
    const r = gradeSet(exp, [
        { account: '  cash ', side: 'D', amount: 3000 },
        { account: 'accounts payable', side: 'C', amount: 3000 }
    ]);
    assert.ok(r.correct && r.score === 2);
});
test('gradeSet: money float-safe (3000.00 matches 3000)', () => {
    const r = gradeSet(exp, [
        { account: 'Cash', side: 'D', amount: 3000.0 },
        { account: 'Accounts Payable', side: 'C', amount: 3000.004 }
    ]);
    assert.ok(r.correct);
});
test('gradeSet: one wrong → score 1, not correct', () => {
    const r = gradeSet(exp, [
        { account: 'Cash', side: 'C', amount: 3000 }, // wrong side
        { account: 'Accounts Payable', side: 'C', amount: 3000 }
    ]);
    assert.ok(!r.correct && r.score === 1 && r.missing === 1 && r.extra === 1);
});
test('gradeSet: missing entry', () => {
    const r = gradeSet(exp, [{ account: 'Cash', side: 'D', amount: 3000 }]);
    assert.ok(!r.correct && r.score === 1 && r.max === 2 && r.missing === 1 && r.extra === 0);
});
test('gradeSet: extra entry', () => {
    const r = gradeSet(exp, [
        { account: 'Cash', side: 'D', amount: 3000 },
        { account: 'Accounts Payable', side: 'C', amount: 3000 },
        { account: 'Sales', side: 'C', amount: 500 }
    ]);
    assert.ok(!r.correct && r.score === 2 && r.extra === 1);
});
test('gradeSet: duplicate handling (multiset)', () => {
    const e = [{ a: 1 }, { a: 1 }];
    const r1 = gradeSet(e, [{ a: 1 }]);          // only one of two duplicates
    assert.ok(r1.score === 1 && r1.missing === 1);
    const r2 = gradeSet(e, [{ a: 1 }, { a: 1 }]); // both
    assert.ok(r2.correct && r2.score === 2);
});
test('gradeSet: classify rows (cls + effect)', () => {
    const e = [{ account: 'Cash', cls: 'A', effect: 'I' }, { account: 'Note Payable', cls: 'L', effect: 'I' }];
    const r = gradeSet(e, [{ account: 'Note Payable', cls: 'L', effect: 'I' }, { account: 'Cash', cls: 'A', effect: 'I' }]);
    assert.ok(r.correct);
});

// ---------------------------------------------------------------- seededRandom
test('seededRandom: same seed → same sequence', () => {
    const a = seededRandom(42); const b = seededRandom(42);
    for (let i = 0; i < 20; i++) assert.strictEqual(a(), b());
});
test('seededRandom: values in [0,1)', () => {
    const r = seededRandom(7);
    for (let i = 0; i < 100; i++) { const v = r(); assert.ok(v >= 0 && v < 1); }
});
test('seededRandom: different seeds differ', () => {
    assert.notStrictEqual(seededRandom(1)(), seededRandom(2)());
});

// ---------------------------------------------------------------- pickParams
const depSpec = {
    cost: { min: 10000, max: 50000, step: 1000 },
    life: { choices: [3, 5, 7, 10] },
    salvage: { min: 0, max: 5000, step: 500 },
    method: 'straight-line'
};
test('pickParams: deterministic for a seed', () => {
    assert.deepStrictEqual(pickParams(depSpec, 123), pickParams(depSpec, 123));
});
test('pickParams: respects range + step', () => {
    for (let seed = 0; seed < 50; seed++) {
        const p = pickParams(depSpec, seed);
        assert.ok(p.cost >= 10000 && p.cost <= 50000 && p.cost % 1000 === 0);
        assert.ok(p.salvage >= 0 && p.salvage <= 5000 && p.salvage % 500 === 0);
    }
});
test('pickParams: choices come from list', () => {
    for (let seed = 0; seed < 50; seed++) {
        assert.ok(depSpec.life.choices.includes(pickParams(depSpec, seed).life));
    }
});
test('pickParams: literal passthrough', () => {
    assert.strictEqual(pickParams(depSpec, 9).method, 'straight-line');
});
test('pickParams: decimal step float-clean', () => {
    const p = pickParams({ rate: { min: 0, max: 1, step: 0.1 } }, 5);
    assert.ok(p.rate >= 0 && p.rate <= 1);
    assert.ok(Math.abs(p.rate * 10 - Math.round(p.rate * 10)) < 1e-9); // multiple of 0.1
});
test('pickParams: empty/invalid spec → {}', () => {
    assert.deepStrictEqual(pickParams(null, 1), {});
});

// ---------------------------------------------------------------- gradeChoice
const choiceEx = {
    type: 'choice',
    items: [
        { q: 'A prepaid expense is an asset.', kind: 'tf', answer: true },
        { q: 'Revenue decreases equity.', kind: 'tf', answer: false },
        { q: 'Which statement is a point-in-time snapshot?', kind: 'mc', options: ['IS', 'Balance sheet', 'Cash flows'], answer: 1 }
    ]
};
test('gradeChoice: all correct', () => {
    const r = gradeChoice(choiceEx, [true, false, 1]);
    assert.ok(r.correct && r.score === 3 && r.max === 3);
});
test('gradeChoice: one tf wrong', () => {
    const r = gradeChoice(choiceEx, [false, false, 1]);
    assert.ok(!r.correct && r.score === 2);
    assert.strictEqual(r.perField[0].ok, false);
    assert.strictEqual(r.perField[0].expected, true);
});
test('gradeChoice: mc wrong index', () => {
    const r = gradeChoice(choiceEx, [true, false, 0]);
    assert.ok(!r.correct && r.score === 2 && r.perField[2].ok === false);
});
test('gradeChoice: unanswered item counts wrong', () => {
    const r = gradeChoice(choiceEx, [true, false, null]);
    assert.ok(!r.correct && r.score === 2 && r.perField[2].got === null);
});
test('gradeChoice: missing answers array → all wrong', () => {
    const r = gradeChoice(choiceEx, undefined);
    assert.ok(!r.correct && r.score === 0 && r.max === 3);
});
test('gradeChoice: tf must match type (1 !== true)', () => {
    const r = gradeChoice(choiceEx, [1, false, 1]); // got=1 (number) vs expected true
    assert.strictEqual(r.perField[0].ok, false);
});
test('gradeChoice: empty items → not correct', () => {
    const r = gradeChoice({ items: [] }, []);
    assert.ok(!r.correct && r.max === 0);
});

// ---------------------------------------------------------------- gradeNumeric
const numEx = {
    type: 'numeric',
    fields: [
        { key: 'endRE', label: 'Ending RE', answer: 103000, tol: 0.005, unit: '$' },
        { key: 'endEquity', label: 'Total equity', answer: 153000, tol: 0.005, unit: '$' }
    ]
};
test('gradeNumeric: both correct (plain)', () => {
    const r = gradeNumeric(numEx, { endRE: '103000', endEquity: '153000' });
    assert.ok(r.correct && r.score === 2 && r.max === 2);
});
test('gradeNumeric: accepts thousands grouping', () => {
    const r = gradeNumeric(numEx, { endRE: '103,000', endEquity: '$153,000.00' });
    assert.ok(r.correct);
});
test('gradeNumeric: one wrong', () => {
    const r = gradeNumeric(numEx, { endRE: '103000', endEquity: '150000' });
    assert.ok(!r.correct && r.score === 1 && r.perField[1].ok === false && r.perField[1].got === 150000);
});
test('gradeNumeric: blank input → not finite, wrong', () => {
    const r = gradeNumeric(numEx, { endRE: '', endEquity: '153000' });
    assert.ok(!r.correct && r.perField[0].ok === false && r.perField[0].got === null);
});
test('gradeNumeric: tolerance respected', () => {
    const ex = { type: 'numeric', fields: [{ key: 'r', answer: 1.9, tol: 0.1 }] };
    assert.ok(gradeNumeric(ex, { r: '1.85' }).correct);
    assert.ok(!gradeNumeric(ex, { r: '2.1' }).correct);
});
test('gradeNumeric: missing answers object → all wrong', () => {
    const r = gradeNumeric(numEx, undefined);
    assert.ok(!r.correct && r.score === 0);
});
// ratio uses the same field-based grader (gradeNumeric) on a givens+fields shape
test('gradeNumeric (ratio shape): both ratios correct', () => {
    const ratioEx = {
        type: 'ratio',
        givens: [{ label: 'Covers', value: 34200 }],
        fields: [
            { key: 'avgCheck', answer: 15.0, tol: 0.01 },
            { key: 'seatTurnover', answer: 1.9, tol: 0.05 }
        ]
    };
    assert.ok(gradeNumeric(ratioEx, { avgCheck: '15', seatTurnover: '1.9' }).correct);
    assert.ok(gradeNumeric(ratioEx, { avgCheck: '15.00', seatTurnover: '1.88' }).correct); // within tol
    assert.ok(!gradeNumeric(ratioEx, { avgCheck: '16', seatTurnover: '1.9' }).correct);
});

// ---------------------------------------------------------------- gradeStatement
const stEx = {
    type: 'statement',
    sections: [
        { key: 'assets', label: 'Assets', lines: [
            { key: 'cash', label: 'Cash', answer: 120000 },
            { key: 'ar', label: 'AR', answer: 10200 }
        ] },
        { key: 'liab', label: 'Liabilities', lines: [
            { key: 'ap', label: 'AP', answer: 15200 }
        ] }
    ],
    totals: [
        { key: 'totalAssets', label: 'Total assets', answer: 130200 },
        { key: 'commonStock', label: 'Common stock', answer: 55000, derived: true }
    ]
};
test('statementCells: flattens lines + totals with stable keys', () => {
    const cells = statementCells(stEx);
    assert.strictEqual(cells.length, 5); // 2 + 1 lines + 2 totals
    assert.deepStrictEqual(cells.map((c) => c.key), ['cash', 'ar', 'ap', 'totalAssets', 'commonStock']);
    assert.strictEqual(cells[4].derived, true);
});
test('gradeStatement: all correct', () => {
    const r = gradeStatement(stEx, { cash: '120000', ar: '10,200', ap: '15200', totalAssets: '130200', commonStock: '55000' });
    assert.ok(r.correct && r.score === 5 && r.max === 5);
});
test('gradeStatement: money cents-safe (float) + currency string input', () => {
    // cash as currency string; ar as a raw float that must round to cents (10200.004 → 10200.00)
    const r = gradeStatement(stEx, { cash: '$120,000.00', ar: 10200.004, ap: '15200', totalAssets: '130200', commonStock: '55000' });
    assert.ok(r.correct);
});
test('gradeStatement: wrong balancing figure flagged', () => {
    const r = gradeStatement(stEx, { cash: '120000', ar: '10200', ap: '15200', totalAssets: '130200', commonStock: '50000' });
    assert.ok(!r.correct && r.score === 4);
    const cs = r.perField.find((p) => p.key === 'commonStock');
    assert.ok(cs.ok === false && cs.expected === 55000 && cs.got === 50000);
});
test('gradeStatement: blank line wrong', () => {
    const r = gradeStatement(stEx, { cash: '', ar: '10200', ap: '15200', totalAssets: '130200', commonStock: '55000' });
    assert.ok(!r.correct && r.perField[0].ok === false && r.perField[0].got === null);
});

// ---------------------------------------------------------------- gradeClassify
const clEx = {
    type: 'classify',
    classes: ['Asset', 'Liability', 'Equity'],
    effects: ['Increase', 'Decrease'],
    rows: [
        { text: 'Invest cash for stock', entries: [
            { account: 'Cash', cls: 'Asset', effect: 'Increase' },
            { account: 'Common Stock', cls: 'Equity', effect: 'Increase' }
        ] },
        { text: 'Pay cash for equipment', entries: [
            { account: 'Equipment', cls: 'Asset', effect: 'Increase' },
            { account: 'Cash', cls: 'Asset', effect: 'Decrease' }
        ] }
    ]
};
test('gradeClassify: all correct', () => {
    const r = gradeClassify(clEx, [
        [{ cls: 'Asset', effect: 'Increase' }, { cls: 'Equity', effect: 'Increase' }],
        [{ cls: 'Asset', effect: 'Increase' }, { cls: 'Asset', effect: 'Decrease' }]
    ]);
    assert.ok(r.correct && r.score === 4 && r.max === 4);
});
test('gradeClassify: wrong effect flagged (cls right, effect wrong = whole slot wrong)', () => {
    const r = gradeClassify(clEx, [
        [{ cls: 'Asset', effect: 'Increase' }, { cls: 'Equity', effect: 'Increase' }],
        [{ cls: 'Asset', effect: 'Increase' }, { cls: 'Asset', effect: 'Increase' }] // last should be Decrease
    ]);
    assert.ok(!r.correct && r.score === 3);
    const last = r.perField[3];
    assert.ok(last.ok === false && last.row === 1 && last.entry === 1);
});
test('gradeClassify: unanswered slot wrong', () => {
    const r = gradeClassify(clEx, [[{ cls: 'Asset', effect: 'Increase' }]]); // most missing
    assert.ok(!r.correct && r.score === 1 && r.max === 4);
});
test('gradeClassify: empty answers → all wrong', () => {
    const r = gradeClassify(clEx, undefined);
    assert.ok(!r.correct && r.score === 0 && r.max === 4);
});
// single-axis classify (no effects) — account → category only
const clNoEff = {
    type: 'classify',
    classes: [{ v: 'CA', label: 'Current Asset' }, { v: 'CL', label: 'Current Liability' }],
    rows: [
        { entries: [{ account: 'Cash', cls: 'CA' }] },
        { entries: [{ account: 'Accounts Payable', cls: 'CL' }] }
    ]
};
test('gradeClassify (no effects): grades on class only — all correct', () => {
    const r = gradeClassify(clNoEff, [[{ cls: 'CA' }], [{ cls: 'CL' }]]);
    assert.ok(r.correct && r.score === 2 && r.max === 2);
});
test('gradeClassify (no effects): wrong class flagged', () => {
    const r = gradeClassify(clNoEff, [[{ cls: 'CA' }], [{ cls: 'CA' }]]);
    assert.ok(!r.correct && r.score === 1);
});
test('gradeClassify (no effects): effect is ignored when ex.effects absent', () => {
    const r = gradeClassify(clNoEff, [[{ cls: 'CA', effect: 'Increase' }], [{ cls: 'CL' }]]);
    assert.ok(r.correct);
});

// ---------------------------------------------------------------- randomized exercise (params/generate)
// Samostalni fixture: ovo testira ENGINE svojstvo (pickParams+generate determinizam),
// pa namjerno NE ovisi o content packu (demoi su maknuti iz data/accounting/exercises.js).
const depEx = {
    type: 'numeric',
    params: {
        cost: { min: 12000, max: 60000, step: 1000 },
        salvage: { min: 0, max: 6000, step: 500 },
        life: { choices: [3, 4, 5, 8, 10] }
    },
    generate: function (p) {
        const annual = (p.cost - p.salvage) / p.life;
        const money = (n) => n.toLocaleString('en-US');
        return {
            prompt: 'An asset costs $' + money(p.cost) + ', has a salvage value of $' + money(p.salvage)
                + ', and a useful life of ' + p.life + ' years. Compute the annual straight-line depreciation.',
            fields: [
                { key: 'dep', label: 'Annual straight-line depreciation', answer: annual, tol: 0.01, unit: '$' }
            ]
        };
    }
};
test('randomized fixture has params + generate', () => {
    assert.ok(depEx && depEx.params && typeof depEx.generate === 'function');
});
test('pickParams + generate: deterministic for a seed', () => {
    const p1 = pickParams(depEx.params, 777);
    const p2 = pickParams(depEx.params, 777);
    assert.deepStrictEqual(p1, p2);
    const g1 = depEx.generate(p1);
    const g2 = depEx.generate(p2);
    assert.strictEqual(g1.fields[0].answer, g2.fields[0].answer);
    assert.strictEqual(g1.prompt, g2.prompt);
});
test('generate: answer equals (cost − salvage) / life', () => {
    for (let seed = 0; seed < 40; seed++) {
        const p = pickParams(depEx.params, seed);
        const g = depEx.generate(p);
        const expected = (p.cost - p.salvage) / p.life;
        assert.ok(Math.abs(g.fields[0].answer - expected) < 1e-9);
        // and the generated answer grades itself correct
        assert.ok(gradeNumeric(g, { dep: String(Math.round(g.fields[0].answer * 100) / 100) }).correct);
    }
});

// ---------------------------------------------------------------- gradeJournal
const jrEx = {
    type: 'journal',
    chartOfAccounts: [
        { name: 'Cash', normal: 'D', section: 'asset' },
        { name: 'Common Stock', normal: 'C', section: 'equity' },
        { name: 'Note Payable', normal: 'C', section: 'liability' }
    ],
    transactions: [
        { text: 'Invest cash', entries: [
            { account: 'Cash', side: 'D', amount: 50000 },
            { account: 'Common Stock', side: 'C', amount: 50000 }
        ] },
        { text: 'Borrow cash', entries: [
            { account: 'Cash', side: 'D', amount: 15000 },
            { account: 'Note Payable', side: 'C', amount: 15000 }
        ] }
    ]
};
test('gradeJournal: all correct (exact order)', () => {
    const r = gradeJournal(jrEx, [
        [{ account: 'Cash', side: 'D', amount: '50000' }, { account: 'Common Stock', side: 'C', amount: '50000' }],
        [{ account: 'Cash', side: 'D', amount: '15000' }, { account: 'Note Payable', side: 'C', amount: '15000' }]
    ]);
    assert.ok(r.correct && r.score === 2 && r.max === 2);
});
test('gradeJournal: order-independent within a transaction', () => {
    const r = gradeJournal(jrEx, [
        [{ account: 'Common Stock', side: 'C', amount: '50,000' }, { account: 'Cash', side: 'D', amount: '50000' }],
        [{ account: 'Note Payable', side: 'C', amount: '15000' }, { account: 'Cash', side: 'D', amount: '15000' }]
    ]);
    assert.ok(r.correct);
});
test('gradeJournal: swapped debit/credit side → wrong', () => {
    const r = gradeJournal(jrEx, [
        [{ account: 'Cash', side: 'C', amount: '50000' }, { account: 'Common Stock', side: 'D', amount: '50000' }],
        [{ account: 'Cash', side: 'D', amount: '15000' }, { account: 'Note Payable', side: 'C', amount: '15000' }]
    ]);
    assert.ok(!r.correct && r.score === 1 && r.perField[0].ok === false);
    // sides swapped still balances (D=C) but accounts/sides don't match expected
    assert.strictEqual(r.perField[0].balanced, true);
});
test('gradeJournal: unbalanced transaction flagged', () => {
    const r = gradeJournal(jrEx, [
        [{ account: 'Cash', side: 'D', amount: '50000' }, { account: 'Common Stock', side: 'C', amount: '40000' }],
        [{ account: 'Cash', side: 'D', amount: '15000' }, { account: 'Note Payable', side: 'C', amount: '15000' }]
    ]);
    assert.ok(!r.correct && r.perField[0].ok === false && r.perField[0].balanced === false);
    assert.strictEqual(r.perField[0].debits, 50000);
    assert.strictEqual(r.perField[0].credits, 40000);
});
test('gradeJournal: blank amounts → wrong + not balanced', () => {
    const r = gradeJournal(jrEx, [
        [{ account: 'Cash', side: 'D', amount: '' }, { account: 'Common Stock', side: 'C', amount: '' }],
        [{ account: 'Cash', side: 'D', amount: '15000' }, { account: 'Note Payable', side: 'C', amount: '15000' }]
    ]);
    assert.ok(!r.correct && r.perField[0].ok === false && r.perField[0].balanced === false);
});
test('gradeJournal: wrong account flagged', () => {
    const r = gradeJournal(jrEx, [
        [{ account: 'Cash', side: 'D', amount: '50000' }, { account: 'Note Payable', side: 'C', amount: '50000' }],
        [{ account: 'Cash', side: 'D', amount: '15000' }, { account: 'Note Payable', side: 'C', amount: '15000' }]
    ]);
    assert.ok(!r.correct && r.perField[0].ok === false);
});

// ---------------------------------------------------------------- normalizeCite / gradeCite
const CITE = { items: [{ answer: 'Smith, John. 2010. The Wealth of Nations. New York: Random House.' }] };
test('normalizeCite: lowercases + trims + drops trailing period', () =>
    assert.strictEqual(normalizeCite('  The Title.  '), 'the title'));
test('normalizeCite: curly quotes → straight', () =>
    assert.strictEqual(normalizeCite('“Title”'), '"title"'));
test('normalizeCite: en/em dash → hyphen', () =>
    assert.strictEqual(normalizeCite('205–221'), '205-221'));
test('normalizeCite: collapses internal whitespace', () =>
    assert.strictEqual(normalizeCite('a,   b'), 'a, b'));
test('gradeCite: exact match correct', () =>
    assert.ok(gradeCite(CITE, ['Smith, John. 2010. The Wealth of Nations. New York: Random House.']).correct));
test('gradeCite: case + no trailing period still correct', () =>
    assert.ok(gradeCite(CITE, ['smith, john. 2010. the wealth of nations. new york: random house']).correct));
test('gradeCite: missing commas/colon is incorrect', () =>
    assert.ok(!gradeCite(CITE, ['Smith John 2010 The Wealth of Nations New York Random House']).correct));
test('gradeCite: empty answer is incorrect', () =>
    assert.ok(!gradeCite(CITE, ['']).correct));
test('gradeCite: accept[] alternate is correct', () => {
    const ex = { items: [{ answer: '(Smith 2010, 12)', accept: ['(Smith 2010, 12).'] }] };
    assert.ok(gradeCite(ex, ['(Smith 2010, 12).']).correct);
});

// ---------------------------------------------------------------- rezultat
console.log('\n========================================');
// ---------------------------------------------------------------- unicode minus + dvosmisleni separator
test('parseAmount: unicode minus U+2212 i crtice U+2012–U+2015', () => {
    assert.strictEqual(parseAmount('\u221240'), -40);
    assert.strictEqual(parseAmount('\u201240'), -40);
    assert.strictEqual(parseAmount('\u201340'), -40);
    assert.strictEqual(parseAmount('\u201440'), -40);
    assert.strictEqual(parseAmount('\u201540'), -40);
});
test('parseAmount: ugovor ostaje — "1.667" = 1667 (tisuće)', () => assert.strictEqual(parseAmount('1.667'), 1667));
test('gradeNumeric: "1.667" prihvaćen i za očekivanih 1.667 (decimalno čitanje)', () => {
    const ex = { fields: [{ key: 'a', answer: 1.667, tol: 0.001 }] };
    assert.strictEqual(gradeNumeric(ex, { a: '1.667' }).correct, true);
    assert.strictEqual(gradeNumeric(ex, { a: '1,667' }).correct, true);
});
test('gradeNumeric: "1.667" i dalje prihvaćen za očekivanih 1667 (tisuće)', () => {
    const ex = { fields: [{ key: 'a', answer: 1667, tol: 0.5 }] };
    assert.strictEqual(gradeNumeric(ex, { a: '1.667' }).correct, true);
});
test('gradeNumeric: dvosmislen unos ne prolazi ako nijedno čitanje ne odgovara', () => {
    const ex = { fields: [{ key: 'a', answer: 5, tol: 0.01 }] };
    assert.strictEqual(gradeNumeric(ex, { a: '1.667' }).correct, false);
});
test('gradeNumeric: unicode minus u unosu', () => {
    const ex = { fields: [{ key: 'a', answer: -40 }] };
    assert.strictEqual(gradeNumeric(ex, { a: '\u221240' }).correct, true);
});

console.log(`Prošlo: ${passed} · Palo: ${failed}`);
if (failed === 0) {
    console.log('✅ exercises-core: svi testovi prolaze.\n');
    process.exit(0);
} else {
    console.log('❌ exercises-core: ima padova — popravi prije nastavka.\n');
    process.exit(1);
}
