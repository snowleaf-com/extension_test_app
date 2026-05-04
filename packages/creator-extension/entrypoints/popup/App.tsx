import './App.css';

export type EventType = 'click' | 'input' | 'change' | 'focusin';
export type TargetMode = 'element' | 'container';

export interface RuleListItem {
  id: string;
  name: string;
  urlPattern: string;
  eventType: EventType;
  targetMode: TargetMode;
}

/** ガワ用サンプル（接続前の見た目確認用） */
const DEMO_RULES: RuleListItem[] = [
  {
    id: '1',
    name: '送信ボタン クリック',
    urlPattern: 'https://example.com/app/*',
    eventType: 'click',
    targetMode: 'element',
  },
  {
    id: '2',
    name: 'フォーム入力エリア',
    urlPattern: '*://*.example.com/checkout*',
    eventType: 'input',
    targetMode: 'container',
  },
];

function eventLabel(t: EventType): string {
  switch (t) {
    case 'click':
      return 'click';
    case 'input':
      return 'input';
    case 'change':
      return 'change';
    case 'focusin':
      return 'focusin';
    default:
      return t;
  }
}

function modeLabel(m: TargetMode): string {
  return m === 'container' ? 'コンテナ監視' : '要素を直接監視';
}

function App() {
  const rules = DEMO_RULES;

  return (
    <div className="creator">
      <header className="creator__header">
        <div className="creator__brand">
          <span className="creator__mark" aria-hidden />
          <div className="creator__titles">
            <h1 className="creator__title">Event Creator</h1>
            <p className="creator__subtitle">DOM イベントルールの作成</p>
          </div>
        </div>
        <button type="button" className="btn-ghost" disabled title="準備中">
          設定
        </button>
      </header>

      <section aria-labelledby="rules-heading">
        <div className="creator__section-head">
          <h2 id="rules-heading" className="creator__label">
            Event rules
          </h2>
        </div>

        {rules.length === 0 ? (
          <div className="creator__empty">
            <p>まだルールがありません。「新規作成」でページ上の要素を選びます。</p>
          </div>
        ) : (
          <ul className="creator__list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {rules.map((rule) => (
              <li key={rule.id}>
                <article className="rule-card">
                  <div className="rule-card__row">
                    <h3 className="rule-card__name">{rule.name}</h3>
                  </div>
                  <p className="rule-card__pattern" title={rule.urlPattern}>
                    {rule.urlPattern}
                  </p>
                  <div className="rule-card__meta">
                    <span className="chip chip--accent">{eventLabel(rule.eventType)}</span>
                    <span className="chip">{modeLabel(rule.targetMode)}</span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}

        <button type="button" className="btn-pill btn-pill--primary">
          新規作成
        </button>
      </section>

      <div className="creator__flow">
        <p className="creator__flow-title">次のフロー（予定）</p>
        <ol>
          <li>対象タブで要素選択モードを開始</li>
          <li>イベント種別・名前を設定して保存</li>
          <li>保存前に監視モード（element / container）を表示</li>
        </ol>
      </div>

      <footer className="creator__footer">
        <p className="creator__hint">
          アクセントはリンク・ハイライトのみ。背景の階層はボーダーで表現します（DESIGN.md）。
        </p>
      </footer>
    </div>
  );
}

export default App;
