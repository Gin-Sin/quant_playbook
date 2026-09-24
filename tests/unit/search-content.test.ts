import assert from 'node:assert/strict'
import test from 'node:test'
import { searchableContent } from '../../lib/search-content.js'

test('practice search keeps the question and removes every spoiler slot', () => {
  const rendered = '<h3>Bridge</h3><PracticeQuestion :page="5"><p>Four people and one torch. What is the minimum time?</p><template #hint><p>Combine the slow walkers.</p></template><template #solution><p>17 minutes.</p><svg>answer diagram</svg></template></PracticeQuestion><details class="concept-review"><summary>Review</summary><p>Reverse induction</p></details><h3>Next question</h3>'
  const result = searchableContent(rendered)
  assert.match(result, /Four people and one torch/)
  assert.match(result, /Next question/)
  for (const spoiler of ['Combine', '17 minutes', 'answer diagram', 'Reverse induction']) assert.ok(!result.includes(spoiler))
})

test('search handles long-form slots and excludes code', () => {
  const result = searchableContent('<p>Question</p><template v-slot:hint><p>Hint</p></template><template v-slot:solution><p>Answer</p></template><pre><code>secret code</code></pre>')
  assert.equal(result, '<p>Question</p>')
})
