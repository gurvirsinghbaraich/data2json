"use client";

import {
  CategoryScale,
  Chart,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import millify from "millify";
import moment from "moment";
import { Line } from "react-chartjs-2";
import "./UsageChart.css";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);
Chart.register(CrosshairPlugin);

type UsageChartProps = {
  tokensUsed: {
    id: number;
    used: number;
    created_at: string;
  }[];
};

export default function UsageChart({ tokensUsed }: UsageChartProps) {
  const getHourlyData = () => {
    const data: Record<number, number> = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
      24: 0,
    };

    tokensUsed.map((token) => {
      if (
        moment().startOf("day").utc().toString() ===
        moment(token.created_at).startOf("day").utc().toString()
      ) {
        const hour = moment(token.created_at).get("hour");
        data[hour] += token.used;
      }
    });

    let values = Object.values(data);

    while (values[values.length - 1] == 0) {
      values.pop();
    }

    return values;
  };

  const getWeeklyData = () => {
    const data: Record<number, number> = {};
    const startOfWeek = moment().startOf("month").weeks();

    Array.from(
      Array(
        moment().endOf("month").weeks() - moment().startOf("month").weeks()
      ).keys()
    ).map((_, idx) => {
      data[idx] = 0;
    });

    tokensUsed.map((token) => {
      const week = moment(token.created_at).weeks() - startOfWeek + 1;

      if (data[week] != undefined) {
        data[week] += token.used;
      }
    });

    let values = Object.values(data);
    while (values[values.length - 1] == 0) {
      values.pop();
    }

    return values;
  };

  return (
    <div className="w-full grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2 grid-cols-1 space-x-[1.4rem]">
      <div className="flex flex-col space-y-[0.7rem]">
        <h4 className="w-full border border-stone-800 text-white bg-stone-900 rounded-md p-[1.05rem] ">
          Hourly
        </h4>
        <div className="bg-stone-900 p-[1.05rem] rounded-md overflow-hidden h-full border border-stone-800">
          <Line
            data={{
              labels: [
                "00",
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
              ],
              datasets: [
                {
                  data: getHourlyData(),
                  backgroundColor: "transparent",
                  borderColor: "#f26c6d",
                  pointBorderColor: "transparent",
                  pointBorderWidth: 4,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      family: "Space Grotesk",
                    },
                  },
                },
                y: {
                  ticks: {
                    stepSize: 100,
                    font: {
                      family: "Space Grotesk",
                    },
                    callback: (value) => millify(Number(value)),
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.05,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-[0.7rem]">
        <h4 className="w-full border border-stone-800 text-white bg-stone-900 rounded-md p-[1.05rem] ">
          Weekly
        </h4>
        <div className="bg-stone-900 p-[1.05rem] rounded-md overflow-hidden h-full border border-stone-800">
          <Line
            data={{
              labels: Array.from(
                Array(
                  moment().endOf("month").weeks() -
                    moment().startOf("month").weeks()
                ).keys()
              ).map((_, idx) => `${idx + 1}`),
              datasets: [
                {
                  data: getWeeklyData(),
                  backgroundColor: "transparent",
                  borderColor: "#f26c6d",
                  pointBorderColor: "transparent",
                  pointBorderWidth: 4,
                },
              ],
            }}
            options={{
              plugins: {
                tooltip: {
                  // @ts-ignore
                  mode: "interpolate",
                  intersect: true,
                },

                crosshair: {
                  line: {
                    color: "#F66",
                    width: 1,
                  },
                  sync: {
                    enabled: true,
                    group: 1,
                    suppressTooltips: false,
                  },
                  zoom: {
                    enabled: true,
                    zoomboxBackgroundColor: "rgba(66,133,244,0.2)",
                    zoomboxBorderColor: "#48F",
                    zoomButtonText: "Reset Zoom",
                    zoomButtonClass: "reset-zoom",
                  },
                },

                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    font: {
                      family: "Space Grotesk",
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      family: "Space Grotesk",
                    },
                    callback: (value) =>
                      millify(Number(value), {
                        precision: 2,
                      }),
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.05,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
