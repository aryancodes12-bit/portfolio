import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = "aryancodes12-bit";

const QUERY = `
query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalCommitContributions
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}
`;

// Fallback: generate mock data if no token
function generateMockData() {
  const weeks = [];
  const now = new Date();
  for (let w = 52; w >= 0; w--) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      // Weighted random — more activity on weekdays
      const isWeekday = d >= 1 && d <= 5;
      const base = isWeekday ? 0.6 : 0.3;
      const count = Math.random() < base ? Math.floor(Math.random() * 12) : 0;
      days.push({
        contributionCount: count,
        date: date.toISOString().split("T")[0],
        weekday: d,
      });
    }
    weeks.push({ contributionDays: days });
  }

  const total = weeks.reduce(
    (sum, w) => sum + w.contributionDays.reduce((s, d) => s + d.contributionCount, 0),
    0
  );

  return { totalContributions: total, weeks };
}

export async function GET() {
  try {
    if (!GITHUB_TOKEN) {
      // Return mock data for development
      const mock = generateMockData();
      return NextResponse.json({
        totalContributions: mock.totalContributions,
        weeks: mock.weeks,
        isMock: true,
      });
    }

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query: QUERY, variables: { username: GITHUB_USERNAME } }),
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    const json = await res.json();
    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      const mock = generateMockData();
      return NextResponse.json({ ...mock, isMock: true });
    }

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      isMock: false,
    });
  } catch {
    const mock = generateMockData();
    return NextResponse.json({ ...mock, isMock: true });
  }
}
