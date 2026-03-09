/* ================================================================
   import.js  –  PDF / Photo Import Engine for Blood Test Dashboard
   Loaded after data.js; depends on global D, render(), showToast(), fmtD()
   ================================================================ */

// ────────────────────────────────────────────────────────────────
// 1. Biomarker Alias Map
//    Maps lowercase lab report names → canonical D.categories key
// ────────────────────────────────────────────────────────────────

var biomarkerAliases = {
  // ── Personal Health ──────────────────────────────────────────
  "bmi":                              "Body Mass Index (BMI)",
  "body mass index":                  "Body Mass Index (BMI)",
  "body mass index (bmi)":            "Body Mass Index (BMI)",
  "weight":                           "Weight",
  "body weight":                      "Weight",
  "height":                           "Height",
  "body height":                      "Height",
  "stature":                          "Height",
  "waist circumference":              "Waist Circumference",
  "waist":                            "Waist Circumference",
  "hip circumference":                "Hip Circumference",
  "hip":                              "Hip Circumference",
  "waist / hip ratio":                "Waist / Hip Ratio",
  "waist to hip ratio":               "Waist / Hip Ratio",
  "waist-to-hip ratio":               "Waist / Hip Ratio",
  "whr":                              "Waist / Hip Ratio",
  "pulse":                            "Pulse",
  "heart rate":                       "Pulse",
  "resting heart rate":               "Pulse",
  "pulse rate":                       "Pulse",
  "systolic blood pressure":          "Systolic Blood Pressure",
  "systolic bp":                      "Systolic Blood Pressure",
  "systolic":                         "Systolic Blood Pressure",
  "blood pressure systolic":          "Systolic Blood Pressure",
  "diastolic blood pressure":         "Diastolic Blood Pressure",
  "diastolic bp":                     "Diastolic Blood Pressure",
  "diastolic":                        "Diastolic Blood Pressure",
  "blood pressure diastolic":         "Diastolic Blood Pressure",
  "oxygen saturation":                "Oxygen Saturation",
  "spo2":                             "Oxygen Saturation",
  "o2 sat":                           "Oxygen Saturation",
  "o2 saturation":                    "Oxygen Saturation",

  // ── Cardiovascular Health ────────────────────────────────────
  "total cholesterol":                "Total Cholesterol",
  "cholesterol total":                "Total Cholesterol",
  "cholesterol":                      "Total Cholesterol",
  "serum cholesterol":                "Total Cholesterol",
  "ldl cholesterol":                  "LDL Cholesterol",
  "ldl":                              "LDL Cholesterol",
  "ldl-c":                            "LDL Cholesterol",
  "ldl-cholesterol":                  "LDL Cholesterol",
  "low density lipoprotein":          "LDL Cholesterol",
  "low-density lipoprotein cholesterol": "LDL Cholesterol",
  "hdl cholesterol":                  "HDL Cholesterol",
  "hdl":                              "HDL Cholesterol",
  "hdl-c":                            "HDL Cholesterol",
  "hdl-cholesterol":                  "HDL Cholesterol",
  "high density lipoprotein":         "HDL Cholesterol",
  "high-density lipoprotein cholesterol": "HDL Cholesterol",
  "triglycerides":                    "Triglycerides",
  "triglyceride":                     "Triglycerides",
  "trigs":                            "Triglycerides",
  "tg":                               "Triglycerides",
  "serum triglycerides":              "Triglycerides",
  "total cholesterol / hdl ratio":    "Total Cholesterol / HDL Ratio",
  "cholesterol/hdl ratio":            "Total Cholesterol / HDL Ratio",
  "chol/hdl ratio":                   "Total Cholesterol / HDL Ratio",
  "tc/hdl":                           "Total Cholesterol / HDL Ratio",
  "tc/hdl ratio":                     "Total Cholesterol / HDL Ratio",
  "apolipoprotein a-i":               "Apolipoprotein A-I",
  "apolipoprotein a1":                "Apolipoprotein A-I",
  "apo a-i":                          "Apolipoprotein A-I",
  "apo a1":                           "Apolipoprotein A-I",
  "apo a-1":                          "Apolipoprotein A-I",
  "apoa1":                            "Apolipoprotein A-I",
  "apolipoprotein a":                 "Apolipoprotein A-I",
  "apolipoprotein b":                 "Apolipoprotein B",
  "apo b":                            "Apolipoprotein B",
  "apob":                             "Apolipoprotein B",
  "apo-b":                            "Apolipoprotein B",
  "apo b100":                         "Apolipoprotein B",
  "apo-b100":                         "Apolipoprotein B",
  "apolipoprotein b100":              "Apolipoprotein B",
  "apolipoprotein b (apob)":          "Apolipoprotein B",
  "apo b (apolipoprotein b)":         "Apolipoprotein B",
  "apolipoprotein b / a-i ratio":     "Apolipoprotein B / A-I Ratio",
  "apob/apoa1":                       "Apolipoprotein B / A-I Ratio",
  "apob/apoa1 ratio":                 "Apolipoprotein B / A-I Ratio",
  "apo b/a1 ratio":                   "Apolipoprotein B / A-I Ratio",
  "lipoprotein (a)":                  "Lipoprotein (a)",
  "lipoprotein a":                    "Lipoprotein (a)",
  "lp(a)":                            "Lipoprotein (a)",
  "lpa":                              "Lipoprotein (a)",
  "lp a":                             "Lipoprotein (a)",
  "lp-a":                             "Lipoprotein (a)",
  "lipoprotein little a":             "Lipoprotein (a)",
  "small ldl cholesterol":            "Small LDL Cholesterol",
  "small dense ldl":                  "Small LDL Cholesterol",
  "sdldl":                            "Small LDL Cholesterol",
  "sd-ldl":                           "Small LDL Cholesterol",
  "cardiovascular risk score":        "Cardiovascular Risk Score",
  "cv risk score":                    "Cardiovascular Risk Score",
  "cvd risk":                         "Cardiovascular Risk Score",
  "qrisk":                            "Cardiovascular Risk Score",
  "non-hdl cholesterol":              "Non-HDL Cholesterol",
  "non hdl cholesterol":              "Non-HDL Cholesterol",
  "non hdl":                          "Non-HDL Cholesterol",
  "non-hdl":                          "Non-HDL Cholesterol",
  "homocysteine":                     "Homocysteine",
  "homocystine":                      "Homocysteine",
  "hcy":                              "Homocysteine",
  "total homocysteine":               "Homocysteine",
  "plasma homocysteine":              "Homocysteine",
  "fibrinogen":                       "Fibrinogen",
  "factor i":                         "Fibrinogen",
  "fibrinogen level":                 "Fibrinogen",

  // ── Metabolic / Diabetes ─────────────────────────────────────
  "glucose":                          "Glucose",
  "fasting glucose":                  "Glucose",
  "blood glucose":                    "Glucose",
  "plasma glucose":                   "Glucose",
  "serum glucose":                    "Glucose",
  "random glucose":                   "Glucose",
  "fasting blood glucose":            "Glucose",
  "blood sugar":                      "Glucose",
  "hba1c":                            "HbA1c",
  "hba1c (ifcc)":                     "HbA1c",
  "haemoglobin a1c":                  "HbA1c",
  "hemoglobin a1c":                   "HbA1c",
  "glycated haemoglobin":             "HbA1c",
  "glycated hemoglobin":              "HbA1c",
  "glycosylated haemoglobin":         "HbA1c",
  "glycosylated hemoglobin":          "HbA1c",
  "a1c":                              "HbA1c",
  "glycated hb":                      "HbA1c",
  "insulin":                          "Insulin",
  "fasting insulin":                  "Insulin",
  "serum insulin":                    "Insulin",
  "c-peptide":                        "C-peptide",
  "c peptide":                        "C-peptide",
  "cpeptide":                         "C-peptide",
  "connecting peptide":               "C-peptide",

  // ── Liver Health ─────────────────────────────────────────────
  "alt (sgpt)":                       "ALT (SGPT)",
  "alt":                              "ALT (SGPT)",
  "sgpt":                             "ALT (SGPT)",
  "alanine aminotransferase":         "ALT (SGPT)",
  "alanine transaminase":             "ALT (SGPT)",
  "alanine aminotransferase (alt)":   "ALT (SGPT)",
  "alt/sgpt":                         "ALT (SGPT)",
  "serum alt":                        "ALT (SGPT)",
  "ast (sgot)":                       "AST (SGOT)",
  "ast":                              "AST (SGOT)",
  "sgot":                             "AST (SGOT)",
  "aspartate aminotransferase":       "AST (SGOT)",
  "aspartate transaminase":           "AST (SGOT)",
  "aspartate aminotransferase (ast)": "AST (SGOT)",
  "ast/sgot":                         "AST (SGOT)",
  "serum ast":                        "AST (SGOT)",
  "ggt":                              "GGT",
  "gamma gt":                         "GGT",
  "gamma-gt":                         "GGT",
  "gamma-glutamyl transferase":       "GGT",
  "gamma glutamyl transferase":       "GGT",
  "gamma-glutamyltransferase":        "GGT",
  "gamma glutamyltransferase":        "GGT",
  "g-gt":                             "GGT",
  "alkaline phosphatase (alp)":       "Alkaline Phosphatase (ALP)",
  "alkaline phosphatase":             "Alkaline Phosphatase (ALP)",
  "alp":                              "Alkaline Phosphatase (ALP)",
  "alk phos":                         "Alkaline Phosphatase (ALP)",
  "alk phosphatase":                  "Alkaline Phosphatase (ALP)",
  "total bilirubin":                  "Total Bilirubin",
  "bilirubin":                        "Total Bilirubin",
  "bilirubin total":                  "Total Bilirubin",
  "serum bilirubin":                  "Total Bilirubin",
  "t. bilirubin":                     "Total Bilirubin",
  "albumin":                          "Albumin",
  "serum albumin":                    "Albumin",
  "alb":                              "Albumin",
  "total protein":                    "Total Protein",
  "protein total":                    "Total Protein",
  "serum total protein":              "Total Protein",
  "tp":                               "Total Protein",
  "globulin":                         "Globulin",
  "serum globulin":                   "Globulin",
  "ldh":                              "LDH",
  "lactate dehydrogenase":            "LDH",
  "lactic dehydrogenase":             "LDH",
  "lipase":                           "Lipase",
  "serum lipase":                     "Lipase",
  "pancreatic amylase":               "Pancreatic Amylase",
  "p-amylase":                        "Pancreatic Amylase",
  "amylase pancreatic":               "Pancreatic Amylase",

  // ── Kidney Health ────────────────────────────────────────────
  "creatinine":                       "Creatinine",
  "serum creatinine":                 "Creatinine",
  "creat":                            "Creatinine",
  "egfr":                             "eGFR",
  "estimated gfr":                    "eGFR",
  "estimated glomerular filtration rate": "eGFR",
  "gfr":                              "eGFR",
  "gfr (estimated)":                  "eGFR",
  "gfr estimated":                    "eGFR",
  "e-gfr":                            "eGFR",
  "urea":                             "Urea",
  "blood urea":                       "Urea",
  "serum urea":                       "Urea",
  "bun":                              "Urea",
  "blood urea nitrogen":              "Urea",
  "uric acid":                        "Uric Acid",
  "urate":                            "Uric Acid",
  "serum uric acid":                  "Uric Acid",
  "serum urate":                      "Uric Acid",
  "cystatin c":                       "Cystatin C",
  "cystatin-c":                       "Cystatin C",
  "cysc":                             "Cystatin C",
  "bicarbonate":                      "Bicarbonate",
  "hco3":                             "Bicarbonate",
  "co2":                              "Bicarbonate",
  "total co2":                        "Bicarbonate",
  "serum bicarbonate":                "Bicarbonate",

  // ── Thyroid ──────────────────────────────────────────────────
  "tsh":                              "TSH",
  "thyroid stimulating hormone":      "TSH",
  "thyrotropin":                      "TSH",
  "serum tsh":                        "TSH",
  "tsh level":                        "TSH",
  "free t4 (ft4)":                    "Free T4 (FT4)",
  "free t4":                          "Free T4 (FT4)",
  "ft4":                              "Free T4 (FT4)",
  "free thyroxine":                   "Free T4 (FT4)",
  "thyroxine free":                   "Free T4 (FT4)",
  "free t3 (ft3)":                    "Free T3 (FT3)",
  "free t3":                          "Free T3 (FT3)",
  "ft3":                              "Free T3 (FT3)",
  "free triiodothyronine":            "Free T3 (FT3)",
  "triiodothyronine free":            "Free T3 (FT3)",
  "anti-tpo":                         "Anti-TPO",
  "anti tpo":                         "Anti-TPO",
  "tpo antibodies":                   "Anti-TPO",
  "thyroid peroxidase antibodies":    "Anti-TPO",
  "tpo ab":                           "Anti-TPO",
  "anti-thyroid peroxidase":          "Anti-TPO",
  "anti-tg":                          "Anti-Tg",
  "anti tg":                          "Anti-Tg",
  "thyroglobulin antibodies":         "Anti-Tg",
  "tg antibodies":                    "Anti-Tg",
  "anti-thyroglobulin":               "Anti-Tg",

  // ── Hormones ─────────────────────────────────────────────────
  "testosterone":                     "Testosterone",
  "total testosterone":               "Testosterone",
  "serum testosterone":               "Testosterone",
  "free testosterone":                "Free Testosterone",
  "free testo":                       "Free Testosterone",
  "calculated free testosterone":     "Free Testosterone",
  "shbg":                             "SHBG",
  "sex hormone binding globulin":     "SHBG",
  "sex hormone-binding globulin":     "SHBG",
  "fsh":                              "FSH",
  "follicle stimulating hormone":     "FSH",
  "follicle-stimulating hormone":     "FSH",
  "lh":                               "LH",
  "luteinising hormone":              "LH",
  "luteinizing hormone":              "LH",
  "prolactin":                        "Prolactin",
  "serum prolactin":                  "Prolactin",
  "prl":                              "Prolactin",
  "cortisol":                         "Cortisol",
  "serum cortisol":                   "Cortisol",
  "morning cortisol":                 "Cortisol",
  "am cortisol":                      "Cortisol",
  "dhea-s":                           "DHEA-S",
  "dhea sulphate":                    "DHEA-S",
  "dhea sulfate":                     "DHEA-S",
  "dheas":                            "DHEA-S",
  "dehydroepiandrosterone sulphate":  "DHEA-S",
  "dehydroepiandrosterone sulfate":   "DHEA-S",
  "oestradiol (e2)":                  "Oestradiol (E2)",
  "oestradiol":                       "Oestradiol (E2)",
  "estradiol":                        "Oestradiol (E2)",
  "e2":                               "Oestradiol (E2)",
  "17-beta estradiol":                "Oestradiol (E2)",
  "17-beta oestradiol":               "Oestradiol (E2)",
  "dht":                              "DHT",
  "dihydrotestosterone":              "DHT",

  // ── Full Blood Count ─────────────────────────────────────────
  "haemoglobin":                      "Haemoglobin",
  "hemoglobin":                       "Haemoglobin",
  "hb":                               "Haemoglobin",
  "hgb":                              "Haemoglobin",
  "haemoglobin (hb)":                 "Haemoglobin",
  "haematocrit":                      "Haematocrit",
  "hematocrit":                       "Haematocrit",
  "hct":                              "Haematocrit",
  "packed cell volume":               "Haematocrit",
  "pcv":                              "Haematocrit",
  "red blood cell count":             "Red Blood Cell Count",
  "rbc":                              "Red Blood Cell Count",
  "rbc count":                        "Red Blood Cell Count",
  "red cell count":                   "Red Blood Cell Count",
  "erythrocyte count":                "Red Blood Cell Count",
  "erythrocytes":                     "Red Blood Cell Count",
  "mcv":                              "MCV",
  "mean corpuscular volume":          "MCV",
  "mean cell volume":                 "MCV",
  "mch":                              "MCH",
  "mean corpuscular haemoglobin":     "MCH",
  "mean corpuscular hemoglobin":      "MCH",
  "mean cell haemoglobin":            "MCH",
  "mean cell hemoglobin":             "MCH",
  "mchc":                             "MCHC",
  "mean corpuscular haemoglobin concentration": "MCHC",
  "mean corpuscular hemoglobin concentration":  "MCHC",
  "mean cell haemoglobin concentration":        "MCHC",
  "white blood cell count":           "White Blood Cell Count",
  "wbc":                              "White Blood Cell Count",
  "wbc count":                        "White Blood Cell Count",
  "white cell count":                 "White Blood Cell Count",
  "total white cell count":           "White Blood Cell Count",
  "leucocyte count":                  "White Blood Cell Count",
  "leukocyte count":                  "White Blood Cell Count",
  "leucocytes":                       "White Blood Cell Count",
  "leukocytes":                       "White Blood Cell Count",
  "neutrophil count":                 "Neutrophil Count",
  "neutrophils":                      "Neutrophil Count",
  "neutrophil":                       "Neutrophil Count",
  "absolute neutrophil count":        "Neutrophil Count",
  "anc":                              "Neutrophil Count",
  "lymphocyte count":                 "Lymphocyte Count",
  "lymphocytes":                      "Lymphocyte Count",
  "lymphocyte":                       "Lymphocyte Count",
  "absolute lymphocyte count":        "Lymphocyte Count",
  "monocyte count":                   "Monocyte Count",
  "monocytes":                        "Monocyte Count",
  "monocyte":                         "Monocyte Count",
  "absolute monocyte count":          "Monocyte Count",
  "eosinophil count":                 "Eosinophil Count",
  "eosinophils":                      "Eosinophil Count",
  "eosinophil":                       "Eosinophil Count",
  "absolute eosinophil count":        "Eosinophil Count",
  "basophil count":                   "Basophil Count",
  "basophils":                        "Basophil Count",
  "basophil":                         "Basophil Count",
  "absolute basophil count":          "Basophil Count",
  "platelet count":                   "Platelet Count",
  "platelets":                        "Platelet Count",
  "plt":                              "Platelet Count",
  "thrombocyte count":                "Platelet Count",
  "thrombocytes":                     "Platelet Count",
  "mpv":                              "MPV",
  "mean platelet volume":             "MPV",
  "rdw":                              "RDW",
  "red cell distribution width":      "RDW",
  "red blood cell distribution width":"RDW",
  "rdw-cv":                           "RDW",
  "esr":                              "ESR",
  "erythrocyte sedimentation rate":   "ESR",
  "sed rate":                         "ESR",
  "sedimentation rate":               "ESR",

  // ── Iron & Minerals ──────────────────────────────────────────
  "iron":                             "Iron",
  "serum iron":                       "Iron",
  "fe":                               "Iron",
  "ferritin":                         "Ferritin",
  "serum ferritin":                   "Ferritin",
  "tibc":                             "TIBC",
  "total iron binding capacity":      "TIBC",
  "total iron-binding capacity":      "TIBC",
  "uibc":                             "UIBC",
  "unsaturated iron binding capacity":"UIBC",
  "unsaturated iron-binding capacity":"UIBC",
  "transferrin":                      "Transferrin",
  "serum transferrin":                "Transferrin",
  "transferrin saturation":           "Transferrin Saturation",
  "transferrin sat":                  "Transferrin Saturation",
  "tsat":                             "Transferrin Saturation",
  "iron saturation":                  "Transferrin Saturation",
  "% transferrin saturation":         "Transferrin Saturation",
  "calcium (adjusted)":               "Calcium (adjusted)",
  "calcium adjusted":                 "Calcium (adjusted)",
  "adjusted calcium":                 "Calcium (adjusted)",
  "corrected calcium":                "Calcium (adjusted)",
  "calcium":                          "Calcium (adjusted)",
  "serum calcium":                    "Calcium (adjusted)",
  "ca":                               "Calcium (adjusted)",
  "magnesium":                        "Magnesium",
  "serum magnesium":                  "Magnesium",
  "mg":                               "Magnesium",
  "phosphate":                        "Phosphate",
  "phosphorus":                       "Phosphate",
  "serum phosphate":                  "Phosphate",
  "inorganic phosphate":              "Phosphate",
  "potassium":                        "Potassium",
  "serum potassium":                  "Potassium",
  "k":                                "Potassium",
  "k+":                               "Potassium",
  "sodium":                           "Sodium",
  "serum sodium":                     "Sodium",
  "na":                               "Sodium",
  "na+":                              "Sodium",
  "chloride":                         "Chloride",
  "serum chloride":                   "Chloride",
  "cl":                               "Chloride",
  "cl-":                              "Chloride",
  "zinc":                             "Zinc",
  "serum zinc":                       "Zinc",
  "zn":                               "Zinc",
  "copper":                           "Copper",
  "serum copper":                     "Copper",
  "cu":                               "Copper",

  // ── Vitamins ─────────────────────────────────────────────────
  "vitamin d":                        "Vitamin D",
  "vit d":                            "Vitamin D",
  "25-oh vitamin d":                  "Vitamin D",
  "25-hydroxyvitamin d":              "Vitamin D",
  "25 hydroxy vitamin d":             "Vitamin D",
  "25-oh-d":                          "Vitamin D",
  "calcidiol":                        "Vitamin D",
  "cholecalciferol":                  "Vitamin D",
  "25(oh)d":                          "Vitamin D",
  "total vitamin d":                  "Vitamin D",
  "vitamin d total":                  "Vitamin D",
  "vitamin d (25-oh)":                "Vitamin D",
  "vitamin b12":                      "Vitamin B12",
  "b12":                              "Vitamin B12",
  "vit b12":                          "Vitamin B12",
  "cobalamin":                        "Vitamin B12",
  "cyanocobalamin":                   "Vitamin B12",
  "serum b12":                        "Vitamin B12",
  "folic acid":                       "Folic Acid",
  "folate":                           "Folic Acid",
  "serum folate":                     "Folic Acid",
  "serum folic acid":                 "Folic Acid",
  "vitamin b9":                       "Folic Acid",
  "vitamin b1":                       "Vitamin B1",
  "b1":                               "Vitamin B1",
  "thiamine":                         "Vitamin B1",
  "thiamin":                          "Vitamin B1",
  "vitamin b2":                       "Vitamin B2",
  "b2":                               "Vitamin B2",
  "riboflavin":                       "Vitamin B2",
  "vitamin b6":                       "Vitamin B6",
  "b6":                               "Vitamin B6",
  "pyridoxine":                       "Vitamin B6",
  "pyridoxal phosphate":              "Vitamin B6",

  // ── Inflammation & Immunity ──────────────────────────────────
  "crp / hscrp":                      "CRP / hsCRP",
  "crp":                              "CRP / hsCRP",
  "c-reactive protein":               "CRP / hsCRP",
  "c reactive protein":               "CRP / hsCRP",
  "hs-crp":                           "CRP / hsCRP",
  "hscrp":                            "CRP / hsCRP",
  "high sensitivity crp":             "CRP / hsCRP",
  "high-sensitivity c-reactive protein": "CRP / hsCRP",
  "hs crp":                           "CRP / hsCRP",
  "ultra-sensitive crp":              "CRP / hsCRP",
  "lp-pla2":                          "Lp-PLA2",
  "lppla2":                           "Lp-PLA2",
  "lipoprotein-associated phospholipase a2": "Lp-PLA2",
  "plac test":                        "Lp-PLA2",
  "iga":                              "IgA",
  "immunoglobulin a":                 "IgA",
  "igg":                              "IgG",
  "immunoglobulin g":                 "IgG",
  "igm":                              "IgM",
  "immunoglobulin m":                 "IgM",
  "ige":                              "IgE",
  "immunoglobulin e":                 "IgE",
  "total ige":                        "IgE",
  "aso":                              "ASO",
  "anti-streptolysin o":              "ASO",
  "anti streptolysin o":              "ASO",
  "aso titre":                        "ASO",
  "asot":                             "ASO",
  "creatine kinase":                  "Creatine Kinase",
  "ck":                               "Creatine Kinase",
  "cpk":                              "Creatine Kinase",
  "creatine phosphokinase":           "Creatine Kinase",
  "total antioxidant status":         "Total Antioxidant Status",
  "tas":                              "Total Antioxidant Status",
  "total antioxidant capacity":       "Total Antioxidant Status",

  // ── Bone & Prostate ──────────────────────────────────────────
  "pth":                              "PTH",
  "parathyroid hormone":              "PTH",
  "intact pth":                       "PTH",
  "parathormone":                     "PTH",
  "total psa":                        "Total PSA",
  "psa":                              "Total PSA",
  "prostate specific antigen":        "Total PSA",
  "prostate-specific antigen":        "Total PSA",

  // ── Coagulation ──────────────────────────────────────────────
  "prothrombin time (pt)":            "Prothrombin Time (PT)",
  "prothrombin time":                 "Prothrombin Time (PT)",
  "pt":                               "Prothrombin Time (PT)",
  "pro time":                         "Prothrombin Time (PT)",
  "inr":                              "INR",
  "international normalised ratio":   "INR",
  "international normalized ratio":   "INR",
  "aptt":                             "APTT",
  "activated partial thromboplastin time": "APTT",
  "partial thromboplastin time":      "APTT",
  "ptt":                              "APTT",

  // ── Fatty Acids ──────────────────────────────────────────────
  "aa/dha ratio":                     "AA/DHA Ratio",
  "arachidonic acid / dha ratio":     "AA/DHA Ratio",
  "aa/epa ratio":                     "AA/EPA Ratio",
  "arachidonic acid / epa ratio":     "AA/EPA Ratio",
  "omega-6/omega-3 ratio":            "AA/EPA Ratio",

  // ── Other ────────────────────────────────────────────────────
  "leptin":                           "Leptin",
  "serum leptin":                     "Leptin",
  "resistin":                         "Resistin",
  "h. pylori":                        "H. pylori",
  "h pylori":                         "H. pylori",
  "helicobacter pylori":              "H. pylori",
  "h.pylori":                         "H. pylori",
  "h. pylori antibodies":             "H. pylori",
  "helicobacter pylori igg":          "H. pylori",

  // ── Additional Randox / Medichecks aliases ──────────────────
  "active b12":                       "Vitamin B12",
  "holotranscobalamin":               "Vitamin B12",
  "active vitamin b12":               "Vitamin B12",
  "vitamin d (25 oh)":                "Vitamin D",
  "25-hydroxyvitamin d3":             "Vitamin D",
  "vitamin d3":                       "Vitamin D",
  "hba1c (dcct)":                     "HbA1c",
  "hba1c (ifcc aligned)":             "HbA1c",
  "glycosylated hb":                  "HbA1c",
  "mean cell hb conc":                "MCHC",
  "mean cell hb concentration":       "MCHC",
  "amylase":                          "Pancreatic Amylase",
  "serum amylase":                    "Pancreatic Amylase",
  "total amylase":                    "Pancreatic Amylase",
  "free androgen index":              "Free Testosterone",
  "fai":                              "Free Testosterone",
  "igf-1":                            "IGF-1",
  "igf1":                             "IGF-1",
  "insulin-like growth factor":       "IGF-1",
  "insulin-like growth factor 1":     "IGF-1",
  "somatomedin c":                    "IGF-1",

  // ── Randox-specific names ──────────────────────────────────────
  "systolic blood pressure":          "Systolic Blood Pressure",
  "diastolic blood pressure":         "Diastolic Blood Pressure",
  "total cholesterol / hdl cholesterol ratio": "Total Cholesterol / HDL Ratio",
  "estimated glomerular filtration rate (egfr)": "eGFR",
  "anti-thyroglobulin antibody (anti-tg)": "Anti-Tg",
  "anti-thyroid peroxidase antibody (anti-tpo)": "Anti-TPO",
  "anti-tissue transglutaminase antibodies (coeliac disease)": "Anti-tTG",
  "antistreptolysin o (aso)":         "ASO",
  "parathyroid hormone (pth)":        "PTH",
  "total prostate specific antigen (tpsa)": "Total PSA",
  "high sensitivity c-reactive protein (hscrp)": "hs-CRP",
  "sex hormone binding globulin":     "SHBG",
  "immunoglobulin a (iga)":           "IgA",
  "immunoglobulin e (ige)":           "IgE",
  "immunoglobulin g (igg)":           "IgG",
  "immunoglobulin m (igm)":          "IgM",
  "thyroid stimulating hormone (tsh)": "TSH",
  "free thyroxine (ft4)":            "Free T4",
  "free tri-iodothyronine (ft3)":    "Free T3",
  "mean cell haemoglobin (mch)":     "MCH",
  "mean cell haemoglobin concentration (mchc)": "MCHC",
  "red blood cell mean cell volume (mcv)": "MCV",
  "red blood cell count":            "Red Blood Cell Count",
  "alanine aminotransferase (alt)":  "ALT",
  "aspartate aminotransferase (ast)": "AST",
  "alkaline phosphatase (alp)":      "ALP",
  "gamma-glutamyltransferase (ggt)": "GGT",
  "total iron binding capacity (tibc)": "TIBC",
  "calcium (adjusted)":              "Calcium",
  "fibrosis-4 score (fib-4)":        "FIB-4 Score",
  "fib-4":                           "FIB-4 Score",
  "fib-4 score":                     "FIB-4 Score",
  "complement component 3 (c3)":     "Complement C3",
  "complement component 4 (c4)":     "Complement C4",
  "c3":                              "Complement C3",
  "c4":                              "Complement C4",
  "thyroxine-binding globulin (tbg)": "TBG",
  "tbg":                             "TBG",
  "thyroxine-binding globulin":      "TBG",
  "rheumatoid factor (rf)":          "Rheumatoid Factor",
  "rheumatoid factor":               "Rheumatoid Factor",
  "rf":                              "Rheumatoid Factor",
  "apolipoprotein cii":              "Apolipoprotein CII",
  "apo cii":                         "Apolipoprotein CII",
  "apolipoprotein ciii":             "Apolipoprotein CIII",
  "apo ciii":                        "Apolipoprotein CIII",
  "fatty acid binding protein-3 (fabp-3)": "FABP-3",
  "fabp-3":                          "FABP-3",
  "fabp3":                           "FABP-3",
  "total antioxidant status (tas)":  "Total Antioxidant Status",
  "total prostate specific antigen": "Total PSA",
  "tpsa":                            "Total PSA",
  "bilirubin (urine)":              "Bilirubin (Urine)",
  "glucose (urine)":                "Glucose (Urine)",
  "ketones (urine)":                "Ketones (Urine)",
  "nitrite (urine)":                "Nitrite (Urine)",
  "protein (urine)":                "Protein (Urine)",
  "red blood cells (urine)":        "Red Blood Cells (Urine)",
  "urobilinogen (urine)":           "Urobilinogen (Urine)",
  "white blood cells (urine)":      "White Blood Cells (Urine)",
  "follicle stimulating hormone":    "FSH",
  "fsh":                             "FSH",
  "luteinising hormone":             "LH",
  "lh":                              "LH",
  "pancreatic amylase":              "Pancreatic Amylase",
  "cardiovascular risk score":       "Cardiovascular Risk Score"
};


// ────────────────────────────────────────────────────────────────
// 2. matchBiomarker(name) — resolve to canonical dashboard name
// ────────────────────────────────────────────────────────────────

function matchBiomarker(name) {
  if (!name) return null;

  // Step 1 — normalise
  var n = name.toLowerCase().replace(/\s+/g, ' ').trim();
  // Strip trailing colon or period
  n = n.replace(/[:.]$/, '').trim();

  // Step 2 — direct alias lookup
  if (biomarkerAliases[n]) return biomarkerAliases[n];

  // Step 3 — exact case-insensitive match against D.categories keys
  for (var cat in D.categories) {
    for (var mk in D.categories[cat]) {
      if (mk.toLowerCase() === n) return mk;
    }
  }

  // Step 4a — strip parenthetical from input and retry alias
  var noParen = n.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  if (noParen !== n && biomarkerAliases[noParen]) return biomarkerAliases[noParen];

  // Step 4b — substring / containment matching
  // Check if any canonical name contains the input or input contains canonical name
  var bestMatch = null;
  var bestLen = 0;
  for (var cat in D.categories) {
    for (var mk in D.categories[cat]) {
      var mkLow = mk.toLowerCase();
      // Canonical name contains input
      if (mkLow.indexOf(n) >= 0 && n.length > 2 && n.length > bestLen) {
        bestMatch = mk;
        bestLen = n.length;
      }
      // Input contains canonical name
      if (n.indexOf(mkLow) >= 0 && mkLow.length > 2 && mkLow.length > bestLen) {
        bestMatch = mk;
        bestLen = mkLow.length;
      }
    }
  }
  // Also check aliases for substring
  for (var alias in biomarkerAliases) {
    if (n.indexOf(alias) >= 0 && alias.length > 2 && alias.length > bestLen) {
      bestMatch = biomarkerAliases[alias];
      bestLen = alias.length;
    }
  }
  if (bestMatch) return bestMatch;

  // Step 5 — no match
  return null;
}


// ────────────────────────────────────────────────────────────────
// 3. parseLabText(rawText)
//    Multi-pass heuristic parser for lab report text
// ────────────────────────────────────────────────────────────────

function parseLabText(rawText) {
  if (!rawText) return [];

  var results = [];
  var seen = {}; // track already-added markers to avoid duplicates

  // Helper: test if a string looks like a numeric value
  function isNumericStr(s) {
    return /^-?[<>]?\s*\d+\.?\d*$/.test(s.trim());
  }

  // Helper: clean a numeric string
  function cleanNum(s) {
    s = s.trim().replace(/^[<>]\s*/, '');
    var v = parseFloat(s);
    return isNaN(v) ? null : v;
  }

  // Helper: test if something is likely a unit string
  function looksLikeUnit(s) {
    if (!s) return false;
    s = s.trim();
    if (s.length === 0 || s.length > 30) return false;
    // Common unit patterns
    if (/^(g\/[dl]|mg\/[dl]|ug\/[dl]|ng\/[dl]|pg\/ml|mmol\/[lL]|umol\/[lL]|nmol\/[lL]|pmol\/[lL]|mIU\/[lL]|U\/[lL]|IU\/ml|kU\/[lL]|%|fl|pg|seconds|sec|s|mm\/hr|mmHg|BPM|bpm|kg|kg\/m\u00B2|kg\/m2|cm|m|ratio|-|ml\/min|ml\/min\/1\.73m2|10\^9\/L|10\^12\/L|10\*9\/L|10\*12\/L|x10[e\^]9\/l|x10[e\^]12\/l|g\/l)$/i.test(s)) {
      return true;
    }
    // Very short, likely a unit
    if (s.length <= 12 && /[a-zA-Z\/]/.test(s) && !/\d{4}/.test(s)) return true;
    return false;
  }

  // Helper: skip junk lines (headers, footers, page numbers, etc.)
  function isJunkLine(line) {
    var l = line.trim().toLowerCase();
    if (l.length < 3) return true;
    if (/^(page\s+\d|report|specimen|collected|received|printed|laboratory|doctor|patient|dob|date|reference|sex|age|nhs|name|address|clinical|sample|blood|accession|status|method|comment|note|interpretation|result|units?\s*$|range|ref\.?\s*range|normal\s*range)/i.test(l)) return true;
    if (/^\d+\s*$/.test(l)) return true; // page numbers
    if (/^[-=_]{3,}$/.test(l)) return true; // divider lines
    if (/^\*+/.test(l)) return true;
    return false;
  }

  // Helper: add a result if not duplicate
  function addResult(name, value, unit) {
    if (!name || value === null || value === undefined) return;
    name = name.trim();
    if (name.length < 2) return;
    var key = name.toLowerCase();
    if (seen[key]) return;
    seen[key] = true;

    var matched = matchBiomarker(name);
    var confidence = "low";
    if (matched) {
      confidence = "high";
    } else {
      // Try partial matching for medium confidence
      for (var cat in D.categories) {
        for (var mk in D.categories[cat]) {
          var mkLow = mk.toLowerCase();
          if (mkLow.indexOf(key) >= 0 || key.indexOf(mkLow) >= 0) {
            confidence = "medium";
            break;
          }
        }
        if (confidence === "medium") break;
      }
    }

    results.push({
      name: name,
      value: value,
      unit: unit || '',
      confidence: confidence,
      matchedTo: matched
    });
  }

  var lines = rawText.split(/\n/);

  // ── Pass 1: line-by-line regex — "Name   Value   Unit  [Range]"
  // Matches lines where a name is followed by whitespace then a number
  var pass1Pattern = /^(.+?)\s{2,}([<>]?\s*\d+\.?\d*)\s+([\w\/\^*\.\u00B2\u00B5µ%\-]+(?:\/[\w\.\u00B2]+)?)/;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (isJunkLine(line)) continue;
    var m = line.match(pass1Pattern);
    if (m) {
      var rawName = m[1].replace(/\s+$/, '').replace(/^\s+/, '');
      var val = cleanNum(m[2]);
      var unit = m[3] ? m[3].trim() : '';
      if (val !== null && rawName.length > 1 && !isJunkLine(rawName)) {
        addResult(rawName, val, unit);
      }
    }
  }

  // ── Pass 2: "Name: Value Unit" or "Name:  Value"
  var pass2Pattern = /^([A-Za-z][\w\s\(\)\-\/\.\,\u00B5µ]*?)\s*:\s*([<>]?\s*\d+\.?\d*)\s*([\w\/\^*\.\u00B2\u00B5µ%\-]*(?:\/[\w\.\u00B2]*)?)\s*$/;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (isJunkLine(line)) continue;
    var m = line.match(pass2Pattern);
    if (m) {
      var rawName = m[1].trim();
      var val = cleanNum(m[2]);
      var unit = m[3] ? m[3].trim() : '';
      if (val !== null && rawName.length > 1) {
        addResult(rawName, val, unit);
      }
    }
  }

  // ── Pass 3: tab-separated values
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (isJunkLine(line)) continue;
    if (line.indexOf('\t') < 0) continue;
    var cols = line.split('\t');
    if (cols.length < 2) continue;
    // Find first column that looks like a name, then first numeric column
    var nameCol = null;
    var valCol = null;
    var unitCol = null;
    for (var c = 0; c < cols.length; c++) {
      var cell = cols[c].trim();
      if (!nameCol && cell.length > 1 && /[A-Za-z]/.test(cell) && !isNumericStr(cell)) {
        nameCol = cell;
      } else if (nameCol && valCol === null && isNumericStr(cell)) {
        valCol = cleanNum(cell);
      } else if (nameCol && valCol !== null && unitCol === null && looksLikeUnit(cell)) {
        unitCol = cell;
        break;
      }
    }
    if (nameCol && valCol !== null) {
      addResult(nameCol, valCol, unitCol || '');
    }
  }

  // ── Pass 4: catch remaining "Name  Value" on same line (no unit)
  var pass4Pattern = /^([A-Za-z][\w\s\(\)\-\/\.\,]*?)\s{2,}([<>]?\s*\d+\.?\d*)\s*$/;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (isJunkLine(line)) continue;
    var m = line.match(pass4Pattern);
    if (m) {
      var rawName = m[1].trim();
      var val = cleanNum(m[2]);
      if (val !== null && rawName.length > 1) {
        addResult(rawName, val, '');
      }
    }
  }

  return results;
}


// ────────────────────────────────────────────────────────────────
// 3b. parseRandoxTracking(rawText)
//     Parses Randox "Biomarker Tracking" multi-date PDFs
//     Returns null if not a Randox tracking PDF
//     Returns {date: [{name,value,unit,confidence,matchedTo}]} otherwise
// ────────────────────────────────────────────────────────────────

function parseRandoxTracking(rawText) {
  if (!rawText) return null;
  if (rawText.indexOf('Biomarker Tracking') < 0) return null;

  var monthMap = {
    'jan':'01','feb':'02','mar':'03','apr':'04','may':'05','jun':'06',
    'jul':'07','aug':'08','sep':'09','oct':'10','nov':'11','dec':'12'
  };

  function toISO(s) {
    var m = s.match(/(\d{1,2})-([A-Za-z]{3})-(\d{4})/);
    if (!m) return null;
    var mon = monthMap[m[2].toLowerCase()];
    if (!mon) return null;
    var d = parseInt(m[1]);
    return m[3] + '-' + mon + '-' + (d < 10 ? '0' + d : '' + d);
  }

  // Randox section headers — skip these, they're not biomarkers
  var sectionHeaders = {};
  ['personal health measurements','full blood count','heart health',
   'iron status','diabetes health','metabolic syndrome','kidney health',
   'urinalysis','liver health','pancreatic health','digestive health',
   'nutritional health','muscle & joint health','bone health',
   'allergy evaluation','infection & inflammation','thyroid health',
   'hormonal health','prostate health','pituitary & adrenal health'
  ].forEach(function(s) { sectionHeaders[s] = true; });

  var lines = rawText.split(/\n/);
  var dateResults = {};
  var currentBiomarker = null;
  var currentUnit = '';
  var seen = {};

  for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    if (!trimmed) continue;

    // Skip page noise
    if (/^0800\s+2545/i.test(trimmed)) continue;
    if (/randoxhealth\.com/i.test(trimmed)) continue;
    if (/^Biomarker\s+Tracking/i.test(trimmed)) continue;
    if (/^CID[\s:]/i.test(trimmed)) continue;
    if (/^D\.O\.B[\s:]/i.test(trimmed)) continue;
    if (/^Your\s+Results/i.test(trimmed)) continue;
    if (/^\s*Date\s+(Result|Test)/i.test(trimmed)) continue;
    if (/^0095-RT/i.test(trimmed)) continue;
    if (/^\d+\s*\/\s*\d+\s*$/.test(trimmed)) continue;
    if (/^\s*(Reference\s+Range|Result|Unit)\s*$/i.test(trimmed)) continue;
    if (/^Please\s+find\s+below/i.test(trimmed)) continue;

    // Skip reference range lines
    if (/^[<>≤≥]\s*\d/.test(trimmed)) continue;
    if (/^\d+\.?\d*\s*[-–]\s*\d+\.?\d*\s/i.test(trimmed)) continue;
    if (/^(Underweight|Optimal|Overweight|Obese|N\/A)\s*$/i.test(trimmed)) continue;

    // Skip section headers
    if (sectionHeaders[trimmed.toLowerCase()]) continue;

    // ── Try to match data line: DD-Mon-YYYY  value  unit ──
    var dm = trimmed.match(/^(\d{1,2}-[A-Za-z]{3}-\d{4})\s+(.+)/);
    if (dm && currentBiomarker) {
      var isoDate = toISO(dm[1]);
      if (!isoDate) continue;

      var rest = dm[2].trim();
      // Skip non-numeric values like "Negative", "Normal"
      if (/^(Negative|Normal|Not\s)/i.test(rest)) continue;

      // Extract value (with optional < or > prefix) and unit
      var vm = rest.match(/^([<>]?\s*\d+\.?\d*)\s*(.*)/);
      if (!vm) continue;

      var numVal = parseFloat(vm[1].replace(/\s/g, '').replace(/^[<>]/, ''));
      if (isNaN(numVal)) continue;

      // Parse unit: first token (may contain /, ^, superscripts, µ, %, etc.)
      var unitPart = vm[2].trim();
      var unit = '';
      if (unitPart) {
        var um = unitPart.match(/^([\w\/\^*\.\u00B2\u00B9\u00B3\u2070-\u209F\u00B5µ%\u00B0\-]+(?:\/[\w\.\u00B2\u00B9\u2070-\u209F\u00B5]+)?)/);
        if (um) unit = um[1];
      }
      if (!unit && currentUnit) unit = currentUnit;

      var key = isoDate + '|' + currentBiomarker.toLowerCase();
      if (!seen[key]) {
        seen[key] = true;
        if (!dateResults[isoDate]) dateResults[isoDate] = [];

        var matched = matchBiomarker(currentBiomarker);
        var confidence = 'low';
        if (matched) {
          confidence = 'high';
        } else {
          for (var cat in D.categories) {
            for (var mk in D.categories[cat]) {
              var mkL = mk.toLowerCase(), bioL = currentBiomarker.toLowerCase();
              if (mkL.indexOf(bioL) >= 0 || bioL.indexOf(mkL) >= 0) {
                confidence = 'medium'; break;
              }
            }
            if (confidence === 'medium') break;
          }
        }

        dateResults[isoDate].push({
          name: currentBiomarker,
          value: numVal,
          unit: unit,
          confidence: confidence,
          matchedTo: matched
        });

        if (unit) currentUnit = unit;
      }
      continue;
    }

    // ── Try to identify biomarker name lines ──
    // Must start with letter, not a date, not a ref-range description
    if (/^[A-Za-z]/.test(trimmed) &&
        !/^\d{1,2}-[A-Za-z]{3}-\d{4}/.test(trimmed) &&
        trimmed.length > 1 &&
        !/^(Underweight|Optimal|Overweight|Obese|Low|High|Normal|Moderate|Very|risk|Indeterminate|Negative|Positive|Trace)/i.test(trimmed) &&
        !/Rev\s*\(/.test(trimmed)) {
      // Accept as biomarker if: matches known alias, OR is a capitalized multi-word name
      if (matchBiomarker(trimmed) || (trimmed.length > 3 && /^[A-Z]/.test(trimmed))) {
        currentBiomarker = trimmed;
        currentUnit = '';
      }
    }
  }

  var dateKeys = Object.keys(dateResults);
  if (dateKeys.length === 0) return null;
  return dateResults;
}


// ────────────────────────────────────────────────────────────────
// 4. extractPDF(file) — async, returns raw text from all pages
// ────────────────────────────────────────────────────────────────

function extractPDF(file, onProgress) {
  return loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js').then(function () {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var typedArray = new Uint8Array(e.target.result);
        pdfjsLib.getDocument({ data: typedArray }).promise.then(function (pdf) {
          var totalPages = pdf.numPages;
          var allText = '';
          var pagesProcessed = 0;

          function processPage(num) {
            if (num > totalPages) {
              resolve(allText);
              return;
            }
            pdf.getPage(num).then(function (page) {
              page.getTextContent().then(function (content) {
                var pageText = '';
                var lastY = null;
                for (var j = 0; j < content.items.length; j++) {
                  var item = content.items[j];
                  // Detect line breaks by Y coordinate change
                  if (lastY !== null && Math.abs(item.transform[5] - lastY) > 2) {
                    pageText += '\n';
                  } else if (lastY !== null) {
                    pageText += ' ';
                  }
                  pageText += item.str;
                  lastY = item.transform[5];
                }
                allText += pageText + '\n\n';
                pagesProcessed++;
                if (onProgress) {
                  onProgress(Math.round((pagesProcessed / totalPages) * 100),
                    'Extracting page ' + num + ' of ' + totalPages);
                }
                processPage(num + 1);
              });
            });
          }

          processPage(1);
        }).catch(reject);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  });
}


// ────────────────────────────────────────────────────────────────
// 5. extractPhoto(file) — async, returns OCR text via Tesseract.js
// ────────────────────────────────────────────────────────────────

function extractPhoto(file, onProgress) {
  return loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js').then(function () {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (e) {
        if (onProgress) onProgress(10, 'Initialising OCR engine...');

        Tesseract.recognize(e.target.result, 'eng', {
          logger: function (m) {
            if (m.status === 'recognizing text' && m.progress != null) {
              var pct = Math.round(m.progress * 100);
              if (onProgress) onProgress(pct, 'Recognising text: ' + pct + '%');
            }
          }
        }).then(function (result) {
          if (onProgress) onProgress(100, 'OCR complete');
          resolve(result.data.text);
        }).catch(reject);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });
}


// ────────────────────────────────────────────────────────────────
// 6. aiParse(rawText, apiKey) — send to Anthropic or OpenAI
// ────────────────────────────────────────────────────────────────

function aiParse(rawText, apiKey) {
  if (!apiKey) return Promise.reject(new Error('No API key provided'));

  // Build the list of known markers from D.categories
  var markerList = [];
  for (var cat in D.categories) {
    for (var mk in D.categories[cat]) {
      markerList.push(mk + ' (' + D.categories[cat][mk].u + ')');
    }
  }

  var systemPrompt = 'You are a medical lab report parser. Extract biomarker results from the text provided. ' +
    'Return ONLY a valid JSON array of objects, each with keys: "name" (string), "value" (number), "unit" (string). ' +
    'Match names to these known markers when possible:\n' + markerList.join(', ') + '\n\n' +
    'If a result does not match any known marker, still include it with the name as shown in the report. ' +
    'Return ONLY the JSON array, no other text.';

  var userPrompt = 'Extract all biomarker results from this lab report text:\n\n' + rawText;

  var isAnthropic = /^sk-ant-/.test(apiKey);

  var url, headers, body;

  if (isAnthropic) {
    url = 'https://api.anthropic.com/v1/messages';
    headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    };
    body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });
  } else {
    url = 'https://api.openai.com/v1/chat/completions';
    headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    };
    body = JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0
    });
  }

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  })
  .then(function (resp) {
    if (!resp.ok) return resp.text().then(function (t) { throw new Error('API error: ' + t); });
    return resp.json();
  })
  .then(function (data) {
    var text;
    if (isAnthropic) {
      text = data.content && data.content[0] ? data.content[0].text : '';
    } else {
      text = data.choices && data.choices[0] ? data.choices[0].message.content : '';
    }

    // Extract JSON array from the response
    var jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('No JSON array found in AI response');
    var items = JSON.parse(jsonMatch[0]);

    // Enrich with matchBiomarker
    var results = [];
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it.name && it.value !== undefined && it.value !== null) {
        var matched = matchBiomarker(it.name);
        results.push({
          name: it.name,
          value: typeof it.value === 'number' ? it.value : parseFloat(it.value),
          unit: it.unit || '',
          confidence: matched ? 'high' : 'medium',
          matchedTo: matched
        });
      }
    }
    return results;
  });
}


// ────────────────────────────────────────────────────────────────
// 7. showReviewTable(results) — editable review table
// ────────────────────────────────────────────────────────────────

function showReviewTable(results, prefillDate, prefillProv) {
  var panel = document.getElementById('review-panel');
  if (!panel) return;

  if (!results || results.length === 0) {
    panel.innerHTML = '<p style="color:var(--muted);padding:16px;">No biomarkers extracted.</p>';
    return;
  }

  var html = '';
  html += '<table style="width:100%;border-collapse:collapse;font-size:.82rem;">';
  html += '<thead><tr>';
  html += '<th style="padding:8px 6px;text-align:center;border-bottom:1px solid var(--border);width:36px;">';
  html += '<input type="checkbox" id="review-check-all" onchange="toggleAllReview(this.checked)" checked></th>';
  html += '<th style="padding:8px 6px;text-align:left;border-bottom:1px solid var(--border);">Extracted Name</th>';
  html += '<th style="padding:8px 6px;text-align:right;border-bottom:1px solid var(--border);width:90px;">Value</th>';
  html += '<th style="padding:8px 6px;text-align:left;border-bottom:1px solid var(--border);width:90px;">Unit</th>';
  html += '<th style="padding:8px 6px;text-align:left;border-bottom:1px solid var(--border);">Matched To</th>';
  html += '<th style="padding:8px 6px;text-align:center;border-bottom:1px solid var(--border);width:30px;">Conf.</th>';
  html += '<th style="padding:8px 6px;text-align:center;border-bottom:1px solid var(--border);width:36px;"></th>';
  html += '</tr></thead><tbody>';

  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var isHigh = r.confidence === 'high';
    var isMed = r.confidence === 'medium';
    var checked = isHigh || isMed;
    var rowOpacity = checked ? '1' : '0.45';
    var dotColor = isHigh ? 'var(--green)' : isMed ? 'var(--yellow)' : 'var(--muted)';

    html += '<tr class="review-row" data-idx="' + i + '" style="opacity:' + rowOpacity + ';">';
    html += '<td style="padding:6px;text-align:center;border-bottom:1px solid var(--border);">';
    html += '<input type="checkbox" class="review-check" ' + (checked ? 'checked' : '') + ' onchange="toggleReviewRow(this)"></td>';
    html += '<td style="padding:6px;border-bottom:1px solid var(--border);">';
    html += '<input type="text" class="review-name" value="' + escHtml(r.name) + '" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;padding:3px 6px;width:100%;font-size:.82rem;"></td>';
    html += '<td style="padding:6px;text-align:right;border-bottom:1px solid var(--border);">';
    html += '<input type="number" step="any" class="review-value" value="' + r.value + '" style="background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:4px;padding:3px 6px;width:80px;text-align:right;font-size:.82rem;"></td>';
    html += '<td style="padding:6px;border-bottom:1px solid var(--border);color:var(--muted);">' + escHtml(r.unit) + '</td>';
    html += '<td style="padding:6px;border-bottom:1px solid var(--border);color:' + (r.matchedTo ? 'var(--text)' : 'var(--muted)') + ';">' +
      (r.matchedTo ? escHtml(r.matchedTo) : '<em>unmatched</em>') + '</td>';
    html += '<td style="padding:6px;text-align:center;border-bottom:1px solid var(--border);">';
    html += '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + dotColor + ';" title="' + r.confidence + '"></span></td>';
    html += '<td style="padding:6px;text-align:center;border-bottom:1px solid var(--border);">';
    html += '<button onclick="deleteReviewRow(this)" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:1rem;" title="Remove">&times;</button></td>';
    html += '</tr>';
  }

  html += '</tbody></table>';

  html += '<div style="display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap;">';
  html += '<label style="font-size:.82rem;color:var(--muted);">Test Date:</label>';
  html += '<input type="date" id="imp-date" style="padding:7px 10px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:.82rem;">';
  html += '<label style="font-size:.82rem;color:var(--muted);margin-left:6px;">Provider:</label>';
  html += '<input type="text" id="imp-prov" placeholder="e.g. Randox" style="padding:7px 10px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:.82rem;width:120px;">';
  html += '<button class="btn btn-p" onclick="importReviewed()" style="margin-left:auto;">Import Selected</button>';
  html += '</div>';

  panel.innerHTML = html;

  // Pre-fill date/provider if passed in, otherwise use today
  var dateInput = document.getElementById('imp-date');
  var provInput = document.getElementById('imp-prov');
  if (dateInput) {
    if (prefillDate) { dateInput.value = prefillDate; }
    else {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      dateInput.value = yyyy + '-' + mm + '-' + dd;
    }
  }
  if (provInput && prefillProv) provInput.value = prefillProv;

  panel.style.display = 'block';

  // Show AI parse option if many low-confidence results
  var lowCount = 0;
  for (var k = 0; k < results.length; k++) { if (results[k].confidence === 'low') lowCount++; }
  var aiBox = document.getElementById('ai-parse-box');
  if (aiBox) aiBox.style.display = (lowCount > results.length * 0.4) ? 'block' : 'none';
}

// Helper — escape HTML entities
function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Review table interaction helpers
function toggleAllReview(checked) {
  var boxes = document.querySelectorAll('.review-check');
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].checked = checked;
    var row = boxes[i].closest('.review-row');
    if (row) row.style.opacity = checked ? '1' : '0.45';
  }
}

function toggleReviewRow(cb) {
  var row = cb.closest('.review-row');
  if (row) row.style.opacity = cb.checked ? '1' : '0.45';
}

function deleteReviewRow(btn) {
  var row = btn.closest('.review-row');
  if (row) row.remove();
}


// ────────────────────────────────────────────────────────────────
// 8. importReviewed() — apply checked review rows to D.categories
// ────────────────────────────────────────────────────────────────

function importReviewed() {
  var dateInput = document.getElementById('imp-date');
  var provInput = document.getElementById('imp-prov');
  var d = dateInput ? dateInput.value : '';
  var prov = provInput ? provInput.value.trim() : '';
  if (!d) { alert('Please set a test date.'); return; }
  if (!prov) prov = 'Manual';

  // Register provider and date source
  if (!D.dateSources[d]) D.dateSources[d] = prov;
  if (!D.providerColors[prov]) D.providerColors[prov] = '#8b8fa3';

  var rows = document.querySelectorAll('.review-row');
  var added = 0;

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cb = row.querySelector('.review-check');
    if (!cb || !cb.checked) continue;

    var nameInput = row.querySelector('.review-name');
    var valInput = row.querySelector('.review-value');
    if (!nameInput || !valInput) continue;

    var rawName = nameInput.value.trim();
    var val = parseFloat(valInput.value);
    if (!rawName || isNaN(val)) continue;

    // Resolve to canonical name
    var canonical = matchBiomarker(rawName);
    var targetName = canonical || rawName;

    // Place marker in correct category (using registry for empty dashboards)
    var unitCell = row.querySelectorAll('td')[3];
    var unit = unitCell ? unitCell.textContent.trim() : '';
    var placement = ensureMarkerInD(targetName, unit);
    D.categories[placement.category][placement.name].v[d] = val;

    added++;
  }

  if (added === 0) {
    alert('No rows selected for import.');
    return;
  }

  // Refresh the dashboard
  if (typeof render === 'function') render();
  if (typeof showToast === 'function') showToast('Imported ' + added + ' result' + (added > 1 ? 's' : '') + ' for ' + fmtD(d));
  if (typeof scheduleSave === 'function') scheduleSave();

  // Clear the review panel
  var panel = document.getElementById('review-panel');
  if (panel) panel.innerHTML = '<p style="color:var(--green);padding:16px;font-weight:600;">Successfully imported ' + added + ' result' + (added > 1 ? 's' : '') + '.</p>';
}


// ────────────────────────────────────────────────────────────────
// 9. Helpers
// ────────────────────────────────────────────────────────────────

// loadScript(src) — returns a Promise that resolves when the script is loaded
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    // If already loaded, resolve immediately
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing) { resolve(); return; }

    var s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = function () { reject(new Error('Failed to load script: ' + src)); };
    document.head.appendChild(s);
  });
}

// ────────────────────────────────────────────────────────────────
// 10. handlePDFUpload / handlePhotoUpload / handleAIParse — UI event handlers
// ────────────────────────────────────────────────────────────────

function handlePDFUpload(event) {
  var file = event.target.files[0];
  if (!file) return;
  var statusEl = document.getElementById('pdf-status');
  var progressEl = document.getElementById('pdf-progress');
  var fillEl = document.getElementById('pdf-progress-fill');
  var extractedEl = document.getElementById('pdf-extracted');
  var rawEl = document.getElementById('pdf-raw');

  statusEl.textContent = 'Loading PDF library...';
  progressEl.style.display = 'block';
  fillEl.style.width = '5%';

  extractPDF(file, function(pct, msg) {
    fillEl.style.width = pct + '%';
    statusEl.textContent = msg;
  }).then(function(text) {
    fillEl.style.width = '100%';
    statusEl.textContent = 'Text extracted. Parsing...';
    rawEl.textContent = text;
    extractedEl.style.display = 'block';

    // Try Randox Biomarker Tracking format first
    var randoxData = (typeof parseRandoxTracking === 'function') ? parseRandoxTracking(text) : null;
    if (randoxData) {
      var dates = Object.keys(randoxData).sort();
      var totalAdded = 0;
      for (var d = 0; d < dates.length; d++) {
        var dt = dates[d];
        if (!D.dateSources) D.dateSources = {};
        if (!D.providerColors) D.providerColors = {};
        if (!D.dateSources[dt]) D.dateSources[dt] = 'Randox';
        if (!D.providerColors['Randox']) {
          var cols = ['#3b82f6','#22c55e','#8b5cf6','#f59e0b','#ec4899','#06b6d4'];
          D.providerColors['Randox'] = cols[Object.keys(D.providerColors).length % cols.length];
        }
        var items = randoxData[dt];
        for (var r = 0; r < items.length; r++) {
          var it = items[r];
          var canonical = it.matchedTo || matchBiomarker(it.name) || it.name;
          var placement = ensureMarkerInD(canonical, it.unit || '');
          D.categories[placement.category][placement.name].v[dt] = it.value;
          totalAdded++;
        }
      }
      statusEl.textContent = 'Imported ' + totalAdded + ' results across ' + dates.length + ' dates.';
      progressEl.style.display = 'none';
      if (typeof render === 'function') render();
      if (typeof scheduleSave === 'function') scheduleSave();
      if (typeof showToast === 'function') showToast('Imported ' + totalAdded + ' results from Randox tracking PDF');
      if (typeof closeModal === 'function') closeModal();
      return;
    }

    var results = parseLabText(text);
    statusEl.textContent = 'Found ' + results.length + ' potential results.';
    progressEl.style.display = 'none';

    if (results.length > 0) {
      // Pre-fill date/provider from PDF tab inputs
      var dateEl = document.getElementById('pdf-date');
      var provEl = document.getElementById('pdf-prov');
      if (dateEl && dateEl.value) document.getElementById('imp-date-review') && (document.getElementById('imp-date-review').value = dateEl.value);
      if (provEl && provEl.value) document.getElementById('imp-prov-review') && (document.getElementById('imp-prov-review').value = provEl.value);

      showReviewTable(results, dateEl ? dateEl.value : '', provEl ? provEl.value : '');
    }
  }).catch(function(err) {
    statusEl.textContent = 'Error: ' + err.message;
    progressEl.style.display = 'none';
  });
}

function handlePhotoUpload(event) {
  var file = event.target.files[0];
  if (!file) return;
  var statusEl = document.getElementById('photo-status');
  var progressEl = document.getElementById('photo-progress');
  var fillEl = document.getElementById('photo-progress-fill');
  var extractedEl = document.getElementById('photo-extracted');
  var rawEl = document.getElementById('photo-raw');

  statusEl.textContent = 'Loading OCR engine (this may take a moment)...';
  progressEl.style.display = 'block';
  fillEl.style.width = '5%';

  extractPhoto(file, function(pct, msg) {
    fillEl.style.width = pct + '%';
    statusEl.textContent = msg;
  }).then(function(text) {
    fillEl.style.width = '100%';
    statusEl.textContent = 'OCR complete. Parsing...';
    rawEl.textContent = text;
    extractedEl.style.display = 'block';

    var results = parseLabText(text);
    statusEl.textContent = 'Found ' + results.length + ' potential results.';
    progressEl.style.display = 'none';

    if (results.length > 0) {
      var dateEl = document.getElementById('photo-date');
      var provEl = document.getElementById('photo-prov');
      showReviewTable(results, dateEl ? dateEl.value : '', provEl ? provEl.value : '');
    }
  }).catch(function(err) {
    statusEl.textContent = 'Error: ' + err.message;
    progressEl.style.display = 'none';
  });
}

function handleAIParse() {
  var apiKey = document.getElementById('ai-key').value.trim();
  if (!apiKey) { alert('Please enter an API key.'); return; }

  // Get the raw text from whichever tab is active
  var rawText = '';
  var pdfRaw = document.getElementById('pdf-raw');
  var photoRaw = document.getElementById('photo-raw');
  if (pdfRaw && pdfRaw.textContent) rawText = pdfRaw.textContent;
  else if (photoRaw && photoRaw.textContent) rawText = photoRaw.textContent;
  if (!rawText) { alert('No extracted text found. Upload a PDF or photo first.'); return; }

  var statusEl = document.getElementById('pdf-status') || document.getElementById('photo-status');
  if (statusEl) statusEl.textContent = 'Sending to AI for parsing...';

  aiParse(rawText, apiKey).then(function(results) {
    if (statusEl) statusEl.textContent = 'AI parsed ' + results.length + ' results.';
    if (results.length > 0) {
      var dateEl = document.getElementById('pdf-date') || document.getElementById('photo-date');
      var provEl = document.getElementById('pdf-prov') || document.getElementById('photo-prov');
      showReviewTable(results, dateEl ? dateEl.value : '', provEl ? provEl.value : '');
    }
  }).catch(function(err) {
    if (statusEl) statusEl.textContent = 'AI parse error: ' + err.message;
    alert('AI parsing failed: ' + err.message);
  });
}


// ────────────────────────────────────────────────────────────────
// 11. showProgress(elementId, percent, message) — update a progress bar element
// ────────────────────────────────────────────────────────────────

// showProgress(elementId, percent, message) — update a progress bar element
function showProgress(elementId, percent, message) {
  var el = document.getElementById(elementId);
  if (!el) return;

  var pct = Math.max(0, Math.min(100, percent));
  var barId = elementId + '-bar';
  var msgId = elementId + '-msg';

  // Build progress bar HTML if not present
  var bar = document.getElementById(barId);
  if (!bar) {
    el.innerHTML =
      '<div style="margin:8px 0;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
          '<span id="' + msgId + '" style="font-size:.78rem;color:var(--muted);"></span>' +
          '<span style="font-size:.78rem;color:var(--muted);">' + pct + '%</span>' +
        '</div>' +
        '<div style="background:var(--border);border-radius:4px;height:6px;overflow:hidden;">' +
          '<div id="' + barId + '" style="background:var(--accent);height:100%;border-radius:4px;width:' + pct + '%;transition:width 0.3s;"></div>' +
        '</div>' +
      '</div>';
    bar = document.getElementById(barId);
  } else {
    bar.style.width = pct + '%';
    // Update percentage display
    var pctSpan = bar.parentElement.parentElement.querySelector('span:last-child');
    if (pctSpan) pctSpan.textContent = pct + '%';
  }

  var msgEl = document.getElementById(msgId);
  if (msgEl && message) msgEl.textContent = message;

  // Clear bar when complete
  if (pct >= 100) {
    setTimeout(function () {
      if (el && el.innerHTML.indexOf(barId) >= 0) {
        el.innerHTML = '';
      }
    }, 1500);
  }
}


// ────────────────────────────────────────────────────────────────
// 12. Marker Registry — maps canonical name → category, unit, range
//     Built once at load time from D (which has full demo data)
// ────────────────────────────────────────────────────────────────

var markerRegistry = {};

function buildMarkerRegistry(sourceData) {
  markerRegistry = {};
  var cats = sourceData && sourceData.categories ? sourceData.categories : {};
  for (var cat in cats) {
    for (var mk in cats[cat]) {
      markerRegistry[mk] = {
        category: cat,
        unit: cats[cat][mk].u || '',
        range: cats[cat][mk].r || 'N/A',
        attia: cats[cat][mk].attia || null
      };
    }
  }
}

// Resolve a canonical marker name to the correct category in D,
// creating the category and marker structure if needed.
// Returns {category, markerName} for the caller to set the value.
function ensureMarkerInD(canonical, unit) {
  // Already exists in D.categories?
  for (var cat in D.categories) {
    if (D.categories[cat][canonical]) return { category: cat, name: canonical };
  }

  // Look up in registry
  var reg = markerRegistry[canonical];
  if (reg) {
    var c = reg.category;
    if (!D.categories[c]) D.categories[c] = {};
    D.categories[c][canonical] = {
      u: reg.unit,
      r: reg.range,
      v: {}
    };
    if (reg.attia) D.categories[c][canonical].attia = reg.attia;
    return { category: c, name: canonical };
  }

  // Fallback: put in Other
  if (!D.categories['Other']) D.categories['Other'] = {};
  if (!D.categories['Other'][canonical]) {
    D.categories['Other'][canonical] = { u: unit || '', r: 'N/A', v: {} };
  }
  return { category: 'Other', name: canonical };
}

// Build registry immediately (D has full demo data at this point)
buildMarkerRegistry(D);

// ────────────────────────────────────────────────────────────────
// 13. Repair Categories — moves markers from "Other" to correct
//     category using the registry (fixes previously broken imports)
// ────────────────────────────────────────────────────────────────

function repairCategories() {
  if (!D.categories || !D.categories['Other']) return 0;
  var moved = 0;
  var others = D.categories['Other'];
  var toRemove = [];

  for (var mk in others) {
    var reg = markerRegistry[mk];
    if (reg && reg.category !== 'Other') {
      var c = reg.category;
      if (!D.categories[c]) D.categories[c] = {};
      // Move marker with its values, but fix unit/range from registry
      D.categories[c][mk] = {
        u: reg.unit,
        r: reg.range,
        v: others[mk].v || {}
      };
      if (reg.attia) D.categories[c][mk].attia = reg.attia;
      toRemove.push(mk);
      moved++;
    }
  }

  // Remove moved markers from Other
  for (var i = 0; i < toRemove.length; i++) {
    delete D.categories['Other'][toRemove[i]];
  }

  // Remove Other if empty
  if (Object.keys(D.categories['Other']).length === 0) {
    delete D.categories['Other'];
  }

  return moved;
}
